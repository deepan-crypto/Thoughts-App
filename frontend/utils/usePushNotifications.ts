import { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { Router } from 'expo-router';
import { authStorage } from './authStorage';
import API_BASE_URL from '@/config/api';

// Check if we're running in Expo Go
const isExpoGo = Constants.appOwnership === 'expo';

// Configure notification handler for foreground display
// (Only meaningful in development builds; harmless in Expo Go)
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: !isExpoGo, // Native alert only in dev build
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: !isExpoGo,
        shouldShowList: true,
    }),
});

/**
 * Custom hook for managing push notifications
 * @param router - Expo Router instance for notification-tap navigation
 * Note: Push notifications require a development build and won't work in Expo Go
 */
export const usePushNotifications = (router?: Router) => {
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
    const notificationListener = useRef<Notifications.EventSubscription | undefined>(undefined);
    const responseListener = useRef<Notifications.EventSubscription | undefined>(undefined);

    useEffect(() => {
        // Skip push notification setup in Expo Go
        if (isExpoGo) {
            console.log('⚠️ Push notifications are not available in Expo Go. Build a development build to enable push notifications.');
        } else {
            // Register for push notifications
            registerForPushNotificationsAsync().then(async token => {
                if (token) {
                    setExpoPushToken(token);
                    // Register token with backend
                    await registerTokenWithBackend(token);
                }
            });

            // Create Android notification channel
            if (Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync('default', {
                    name: 'Thoughts Notifications',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#458FD0',
                    sound: 'default',
                });
            }
        }

        // Listen for notifications received while app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
            console.log('Notification received in foreground:', notification);
        });

        // Listen for notification taps (works in both Expo Go and dev builds for tap handling)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('Notification tapped:', response);
            if (router) {
                handleNotificationResponse(response, router);
            }
        });

        return () => {
            notificationListener.current?.remove();
            responseListener.current?.remove();
        };
    }, []);

    return {
        expoPushToken,
        notification,
    };
};

/**
 * Register for push notifications and get token
 */
async function registerForPushNotificationsAsync(): Promise<string | null> {
    let token: string | null = null;

    try {
        // Don't attempt in Expo Go
        if (isExpoGo) {
            return null;
        }

        // Check existing permissions
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        // Ask for permission if not granted
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        // If permission denied, return null
        if (finalStatus !== 'granted') {
            console.log('Permission for push notifications denied');
            return null;
        }

        // Get the Expo push token
        const projectId = Constants.expoConfig?.extra?.eas?.projectId;

        if (!projectId) {
            console.warn('Project ID not found. Push notifications may not work properly.');
        }

        token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
        console.log('Expo Push Token:', token);

    } catch (error) {
        console.error('Error getting push token:', error);
    }

    return token;
}

/**
 * Register push token with backend
 */
async function registerTokenWithBackend(pushToken: string): Promise<void> {
    try {
        const token = await authStorage.getToken();
        const user = await authStorage.getUser();

        if (!token || !user) {
            console.log('User not logged in, skipping token registration');
            return;
        }

        const response = await fetch(`${API_BASE_URL}/users/register-push-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ pushToken }),
        });

        if (response.ok) {
            console.log('Push token registered with backend successfully');
        } else {
            const data = await response.json();
            console.error('Failed to register push token:', data.message);
        }
    } catch (error) {
        console.error('Error registering push token with backend:', error);
    }
}

/**
 * Handle notification tap to navigate to the relevant screen
 */
function handleNotificationResponse(response: Notifications.NotificationResponse, router: Router): void {
    const data = response.notification.request.content.data as {
        type?: string;
        pollId?: string;
        senderId?: string;
    };

    console.log('Notification tapped, navigating for type:', data?.type);

    try {
        if (data?.type === 'poll_like' || data?.type === 'poll_vote') {
            if (data.pollId) {
                router.push(`/poll/${data.pollId}` as any);
            } else {
                router.push('/(tabs)/notifications' as any);
            }
        } else if (
            data?.type === 'follow_request' ||
            data?.type === 'follow' ||
            data?.type === 'follow_accepted'
        ) {
            router.push('/(tabs)/notifications' as any);
        } else {
            // Default: go to notifications tab
            router.push('/(tabs)/notifications' as any);
        }
    } catch (error) {
        console.error('Navigation error on notification tap:', error);
    }
}

/**
 * Clear all notifications
 */
export async function clearAllNotifications(): Promise<void> {
    if (isExpoGo) {
        console.log('Clear notifications not available in Expo Go');
        return;
    }
    await Notifications.dismissAllNotificationsAsync();
}

/**
 * Set badge count
 */
export async function setBadgeCount(count: number): Promise<void> {
    if (isExpoGo) {
        console.log('Badge count not available in Expo Go');
        return;
    }
    await Notifications.setBadgeCountAsync(count);
}
