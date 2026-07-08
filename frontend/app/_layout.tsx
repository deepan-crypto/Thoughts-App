import { useEffect, useState, useCallback } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { OpenSans_300Light, OpenSans_400Regular, OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';
import * as SplashScreen from 'expo-splash-screen';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import { usePushNotifications } from '@/utils/usePushNotifications';
import { ToastProvider } from '@/utils/ToastContext';
import { NotificationBanner, NotificationBannerData } from '@/components/NotificationBanner';
import { useSocket } from '@/utils/useSocket';
import { getProfileImageUrl } from '@/utils/profileImageUtils';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const router = useRouter();

  // Pass router so notification taps can navigate
  usePushNotifications(router);

  // In-app foreground notification banner state
  const [bannerData, setBannerData] = useState<NotificationBannerData | null>(null);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
  });

  // Parse a deep link URL into a route to navigate to
  // Handles both:
  //   https://thoughts.co.in/poll/abc123   (web share link)
  //   thoughts://poll/abc123               (custom scheme — host="poll", path="/abc123")
  const parseDeepLink = (url: string): { type: 'poll'; id: string } | { type: 'profile'; username: string } | { type: 'reset-password'; token: string } | null => {
    try {
      const parsed = new URL(url);

      // Custom scheme: thoughts://poll/abc123
      //   parsed.host = "poll", parsed.pathname = "/abc123"
      if (parsed.protocol === 'thoughts:') {
        const segment = parsed.host; // "poll", "profile", or "reset-password"
        const id = parsed.pathname.replace(/^\//, ''); // strip leading slash
        if (segment === 'poll' && id) return { type: 'poll', id };
        if (segment === 'profile' && id) return { type: 'profile', username: id };
        if (segment === 'reset-password') {
          const token = parsed.searchParams.get('token');
          if (token) return { type: 'reset-password', token };
        }
        return null;
      }

      // HTTPS web link: https://thoughts.co.in/poll/abc123
      //   parsed.pathname = "/poll/abc123"
      const path = parsed.pathname;
      if (path.startsWith('/poll/')) {
        const pollId = path.replace('/poll/', '');
        if (pollId) return { type: 'poll', id: pollId };
      } else if (path.startsWith('/profile/')) {
        const username = path.replace('/profile/', '');
        if (username) return { type: 'profile', username };
      } else if (path.startsWith('/reset-password')) {
        const token = parsed.searchParams.get('token');
        if (token) return { type: 'reset-password', token };
      }
    } catch (error) {
      console.error('Error parsing deep link:', error);
    }
    return null;
  };


  // Navigate to a deep link target (used when app is already open / warm start)
  const navigateToDeepLink = (route: NonNullable<ReturnType<typeof parseDeepLink>>) => {
    if (route.type === 'poll') {
      router.push(`/poll/${route.id}`);
    } else if (route.type === 'profile') {
      router.push({ pathname: '/(tabs)/profile/[username]', params: { username: route.username } });
    } else if (route.type === 'reset-password') {
      router.push({ pathname: '/auth/reset-password', params: { token: route.token } });
    }
  };

  // Navigate to a deep link target on cold start:
  // First ensure (tabs) is in the stack so back button goes to home instead of exiting
  const navigateToDeepLinkColdStart = (route: NonNullable<ReturnType<typeof parseDeepLink>>) => {
    // For reset-password, navigate directly — no need to mount tabs first
    if (route.type === 'reset-password') {
      setTimeout(() => {
        router.replace({ pathname: '/auth/reset-password', params: { token: route.token } });
      }, 300);
      return;
    }

    router.replace('/(tabs)');
    // Small delay to let the tabs screen mount before pushing the target screen
    setTimeout(() => {
      if (route.type === 'poll') {
        router.push(`/poll/${route.id}`);
      } else if (route.type === 'profile') {
        router.push({ pathname: '/(tabs)/profile/[username]', params: { username: route.username } });
      }
    }, 300);
  };

  // Show in-app notification banner helper
  const showBanner = useCallback((title: string, body: string, avatar?: string, onPress?: () => void) => {
    setBannerData({ title, body, avatar: avatar ? getProfileImageUrl(avatar) : undefined, onPress });
  }, []);

  // Listen for foreground push notifications → show in-app banner
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      const { title, body, data } = notification.request.content;
      if (!title && !body) return;

      const notifData = data as { type?: string; pollId?: string; avatar?: string };

      showBanner(
        title ?? 'Thoughts',
        body ?? '',
        notifData?.avatar,
        () => {
          if (notifData?.type === 'poll_like' || notifData?.type === 'poll_vote') {
            if (notifData.pollId) router.push(`/poll/${notifData.pollId}` as any);
            else router.push('/(tabs)/notifications' as any);
          } else {
            router.push('/(tabs)/notifications' as any);
          }
        }
      );
    });

    return () => subscription.remove();
  }, [showBanner]);

  // Listen for real-time socket notifications → show in-app banner
  // (Socket fires faster than push notifications when app is open)
  const { socket } = useSocket();
  useEffect(() => {
    if (!socket) return;

    const handleSocketNotification = (notification: any) => {
      const senderName = notification?.user?.name || 'Someone';
      const action = notification?.action || 'sent you a notification';
      const avatar = notification?.user?.avatar;
      const type = notification?.type;
      const pollId = notification?.pollId;

      showBanner(
        'Thoughts',
        `${senderName} ${action}`,
        avatar,
        () => {
          if (type === 'like' || type === 'vote') {
            if (pollId) router.push(`/poll/${pollId}` as any);
            else router.push('/(tabs)/notifications' as any);
          } else {
            router.push('/(tabs)/notifications' as any);
          }
        }
      );
    };

    socket.on('new_notification', handleSocketNotification);
    return () => { socket.off('new_notification', handleSocketNotification); };
  }, [socket, showBanner]);

  // Deep link & URL handling
  useEffect(() => {
    // Handle URL that opened the app (cold start)
    Linking.getInitialURL().then((url) => {
      if (url) {
        const route = parseDeepLink(url);
        if (route) {
          setTimeout(() => navigateToDeepLinkColdStart(route), 1000);
        }
      }
    });

    // Handle URLs while app is already open (warm start)
    const subscription = Linking.addEventListener('url', (event) => {
      const route = parseDeepLink(event.url);
      if (route) {
        navigateToDeepLink(route);
      }
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ToastProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="auth/signup" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/forgot-password" />
        <Stack.Screen name="auth/reset-password-sent" />
        <Stack.Screen name="auth/reset-password" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="privacy-policy" />
        <Stack.Screen name="terms" />
        <Stack.Screen name="edit-profile" options={{ presentation: 'modal' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />

      {/* Instagram-style foreground notification banner */}
      <NotificationBanner
        data={bannerData}
        onDismiss={() => setBannerData(null)}
      />
    </ToastProvider>
  );
}
