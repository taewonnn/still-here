import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useCheckInStore } from '@/stores/useCheckInStore';

const MESSAGES = [
  '오늘도 여기 있어.',
  '잘했어. 오늘 기록됐어.',
  '지금은 이것만 해도 충분해.',
  '여기 있는 거, 충분히 대단한 거야.',
];

export default function CheckInCompleteScreen() {
  const streak = useCheckInStore((s) => s.streak);
  const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

  return (
    <View className="flex-1 bg-background items-center justify-center px-8 gap-8">
      <View className="w-24 h-24 rounded-full bg-primary items-center justify-center">
        <Text className="text-background text-4xl">✓</Text>
      </View>

      <View className="items-center gap-3">
        <Text className="text-text-primary text-2xl font-bold text-center">{message}</Text>
        {streak > 1 && (
          <Text className="text-text-muted text-sm">{streak}일 연속이야.</Text>
        )}
      </View>

      <View className="w-full gap-3 mt-4">
        <Pressable
          onPress={() => router.push('/calm-mode')}
          className="bg-surface rounded-2xl py-4 items-center active:opacity-80"
          accessibilityRole="button"
          accessibilityLabel="위기 모드로 이동"
        >
          <Text className="text-danger text-base">지금 힘들어요</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push('/(tabs)/safety-plan')}
          className="bg-surface-2 rounded-2xl py-4 items-center active:opacity-80"
          accessibilityRole="button"
          accessibilityLabel="버팀목 보기"
        >
          <Text className="text-text-secondary text-base">버팀목 보기</Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace('/(tabs)/home')}
          className="py-4 items-center active:opacity-70"
          accessibilityRole="button"
          accessibilityLabel="홈으로 돌아가기"
        >
          <Text className="text-text-muted text-base">홈으로</Text>
        </Pressable>
      </View>
    </View>
  );
}
