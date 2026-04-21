import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STEPS = [
  {
    title: 'Still Here',
    body: '하루 한 번,\n"오늘도 여기 있다"는 것만\n확인해도 충분해.',
    sub: null,
  },
  {
    title: '복잡하지 않아.',
    body: '버튼 하나만 눌러도 돼.\n긴 기록도, 숙제도 없어.\n그냥 여기 있으면 돼.',
    sub: null,
  },
  {
    title: '중요한 안내',
    body: '이 앱은 진단이나 치료를\n대신하지 않아.\n\n힘들 때 버티는 것을\n함께할 뿐이야.',
    sub: '위기 상황이라면 자살예방상담전화 1393으로 연락해.',
  },
];

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const current = STEPS[step];

  const handleNext = async () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      return;
    }
    await AsyncStorage.setItem('onboarding_done', 'true');
    router.replace('/(tabs)/home');
  };

  return (
    <View className="flex-1 bg-background px-8 justify-between py-20">
      <View className="flex-row gap-2 mt-4">
        {STEPS.map((_, i) => (
          <View
            key={i}
            className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-primary' : 'bg-surface-2'}`}
          />
        ))}
      </View>

      <View className="flex-1 justify-center gap-6">
        <Text className="text-text-secondary text-sm tracking-widest uppercase">
          {step + 1} / {STEPS.length}
        </Text>
        <Text className="text-text-primary text-4xl font-bold leading-tight">
          {current.title}
        </Text>
        <Text className="text-text-secondary text-lg leading-8">{current.body}</Text>
        {current.sub && (
          <Text className="text-text-muted text-sm leading-6 mt-2">{current.sub}</Text>
        )}
      </View>

      <Pressable
        onPress={handleNext}
        className="bg-primary rounded-2xl py-5 items-center active:opacity-80"
        accessibilityRole="button"
        accessibilityLabel={step < STEPS.length - 1 ? '다음' : '시작하기'}
      >
        <Text className="text-background text-lg font-semibold">
          {step < STEPS.length - 1 ? '다음' : '시작하기'}
        </Text>
      </Pressable>
    </View>
  );
}
