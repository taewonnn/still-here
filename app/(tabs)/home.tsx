import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useCheckInStore } from '@/stores/useCheckInStore';

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const getWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - dayOfWeek);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().split('T')[0];
  });
};

export default function HomeScreen() {
  const { isCheckedInToday, streak, records, checkIn } = useCheckInStore();
  const weekDates = getWeekDates();
  const checkedDates = new Set(records.map((r) => r.date));

  const handleCheckIn = async () => {
    await checkIn();
    router.push('/check-in-complete');
  };

  return (
    <View className="flex-1 bg-background px-6 pt-16 pb-8">
      <View className="mb-10">
        <Text className="text-text-muted text-sm">
          {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}
        </Text>
        <Text className="text-text-primary text-2xl font-bold mt-1">Still Here</Text>
      </View>

      <View className="flex-row justify-between mb-10">
        {weekDates.map((date, i) => {
          const checked = checkedDates.has(date);
          const isToday = date === new Date().toISOString().split('T')[0];
          return (
            <View key={date} className="items-center gap-1">
              <Text className="text-text-muted text-xs">{WEEK_DAYS[i]}</Text>
              <View
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  checked ? 'bg-primary' : isToday ? 'border border-primary' : 'bg-surface-2'
                }`}
              >
                {checked && <Text className="text-background text-xs font-bold">✓</Text>}
              </View>
            </View>
          );
        })}
      </View>

      <View className="flex-1 items-center justify-center gap-4">
        {streak > 0 && (
          <Text className="text-text-muted text-sm">
            {streak}일 연속 체크인 중
          </Text>
        )}

        <Pressable
          onPress={handleCheckIn}
          disabled={isCheckedInToday}
          className={`w-56 h-56 rounded-full items-center justify-center ${
            isCheckedInToday ? 'bg-surface-2' : 'bg-primary'
          } active:opacity-80`}
          accessibilityRole="button"
          accessibilityLabel="오늘 체크인하기"
        >
          <Text
            className={`text-lg font-semibold text-center leading-7 ${
              isCheckedInToday ? 'text-text-muted' : 'text-background'
            }`}
          >
            {isCheckedInToday ? '오늘도\n여기 있어.' : '나\n여기 있어.'}
          </Text>
        </Pressable>

        {isCheckedInToday && (
          <Text className="text-text-muted text-sm">오늘 체크인 완료</Text>
        )}
      </View>

      <Pressable
        onPress={() => router.push('/calm-mode')}
        className="bg-surface rounded-2xl py-4 items-center active:opacity-80 mt-4"
        accessibilityRole="button"
        accessibilityLabel="지금 힘들어요"
      >
        <Text className="text-danger text-base font-medium">지금 힘들어요</Text>
      </Pressable>
    </View>
  );
}
