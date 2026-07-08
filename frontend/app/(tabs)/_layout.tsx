import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { authStorage } from '@/utils/authStorage';
import API_BASE_URL from '@/config/api';
import { useSocket } from '@/utils/useSocket';

function useUnreadNotificationCount() {
  const [unreadCount, setUnreadCount] = useState(0);
  const { socket } = useSocket();

  const fetchUnreadCount = useCallback(async () => {
    try {
      const token = await authStorage.getToken();
      if (!token) return;
      const response = await fetch(`${API_BASE_URL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        const unread = (data.notifications ?? []).filter((n: any) => !n.read).length;
        setUnreadCount(unread);
      }
    } catch {
      // Ignore errors silently
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount]);

  // Increment badge when a new socket notification arrives
  useEffect(() => {
    if (!socket) return;
    const handler = () => setUnreadCount(prev => prev + 1);
    socket.on('new_notification', handler);
    return () => { socket.off('new_notification', handler); };
  }, [socket]);

  return { unreadCount, setUnreadCount, fetchUnreadCount };
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { unreadCount, setUnreadCount } = useUnreadNotificationCount();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4098D2',
        tabBarInactiveTintColor: '#4098D2',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom + 10,
          paddingTop: 10,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="posts"
        options={{
          title: 'Posts',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'layers' : 'layers-outline'}
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <Ionicons
                name={focused ? 'notifications' : 'notifications-outline'}
                size={26}
                color={color}
              />
              {unreadCount > 0 && (
                <View style={styles.badge}>
                  <View style={styles.badgeDot} />
                </View>
              )}
            </View>
          ),
        }}
        listeners={{
          // Clear badge when user opens the Notifications tab
          tabPress: () => setUnreadCount(0),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/[username]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -1,
    right: -3,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#FF3B30',
  },
});
