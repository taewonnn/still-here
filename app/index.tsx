import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { View } from 'react-native';

export default function Index() {
  const [target, setTarget] = useState<'onboarding' | 'home' | null>(null);

  useEffect(() => {
    const check = async () => {
      const done = await AsyncStorage.getItem('onboarding_done');
      setTarget(done ? 'home' : 'onboarding');
    };
    check();
  }, []);

  if (!target) return <View className="flex-1 bg-background" />;
  if (target === 'onboarding') return <Redirect href="/(onboarding)" />;
  return <Redirect href="/(tabs)/home" />;
}
