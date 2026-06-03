import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { OpenSans_300Light, OpenSans_400Regular, OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';
import * as SplashScreen from 'expo-splash-screen';
import * as Linking from 'expo-linking';
import { usePushNotifications } from '@/utils/usePushNotifications';
import { ToastProvider } from '@/utils/ToastContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  usePushNotifications();

  const router = useRouter();

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
  const parseDeepLink = (url: string): { type: 'poll'; id: string } | { type: 'profile'; username: string } | null => {
    try {
      const parsed = new URL(url);
      const path = parsed.pathname; // e.g. "/poll/abc123" or "/profile/username"

      if (path.startsWith('/poll/')) {
        const pollId = path.replace('/poll/', '');
        if (pollId) return { type: 'poll', id: pollId };
      } else if (path.startsWith('/profile/')) {
        const username = path.replace('/profile/', '');
        if (username) return { type: 'profile', username };
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
    }
  };

  // Navigate to a deep link target on cold start:
  // First ensure (tabs) is in the stack so back button goes to home instead of exiting
  const navigateToDeepLinkColdStart = (route: NonNullable<ReturnType<typeof parseDeepLink>>) => {
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

  useEffect(() => {
    // Handle URL that opened the app (cold start)
    Linking.getInitialURL().then((url) => {
      if (url) {
        const route = parseDeepLink(url);
        if (route) {
          // Wait for navigation to be ready, then navigate with proper back stack
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
    </ToastProvider>
  );
}

