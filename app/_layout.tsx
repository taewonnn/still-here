import '../global.css';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCheckInStore } from '@/stores/useCheckInStore';
import { useSafetyPlanStore } from '@/stores/useSafetyPlanStore';
import { useContactsStore } from '@/stores/useContactsStore';
import { useSettingsStore } from '@/stores/useSettingsStore';

const queryClient = new QueryClient();

export default function RootLayout() {
  const loadRecords = useCheckInStore((s) => s.loadRecords);
  const loadPlan = useSafetyPlanStore((s) => s.loadPlan);
  const loadContacts = useContactsStore((s) => s.loadContacts);
  const loadSettings = useSettingsStore((s) => s.loadSettings);

  useEffect(() => {
    loadRecords();
    loadPlan();
    loadContacts();
    loadSettings();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0f0f0f' } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="check-in-complete" options={{ presentation: 'modal', animation: 'fade' }} />
        <Stack.Screen name="calm-mode" options={{ presentation: 'modal' }} />
      </Stack>
    </QueryClientProvider>
  );
}
