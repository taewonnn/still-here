import { View, Text, Pressable, Switch, Linking } from 'react-native';
import { useSettingsStore } from '@/stores/useSettingsStore';

type RowProps = {
  label: string;
  value?: string;
  children?: React.ReactNode;
};

const Row = ({ label, value, children }: RowProps) => (
  <View className="flex-row justify-between items-center py-4 border-b border-surface-2">
    <Text className="text-text-primary text-base">{label}</Text>
    {children ?? <Text className="text-text-muted text-base">{value}</Text>}
  </View>
);

export default function SettingsScreen() {
  const { settings, updateSettings } = useSettingsStore();

  return (
    <View className="flex-1 bg-background px-6 pt-16 pb-8">
      <Text className="text-text-primary text-2xl font-bold mb-8">설정</Text>

      <View className="bg-surface rounded-2xl px-4 mb-6">
        <Row label="알림">
          <Switch
            value={settings.notificationsEnabled}
            onValueChange={(v) => updateSettings({ notificationsEnabled: v })}
            trackColor={{ false: '#242424', true: '#a8d5a2' }}
            thumbColor="#f0f0f0"
            accessibilityLabel="알림 켜기/끄기"
          />
        </Row>
        <Row label="알림 시간" value={settings.notificationTime} />
      </View>

      <View className="bg-surface rounded-2xl px-4 mb-6">
        <Row label="버전" value="1.0.0" />
      </View>

      <View className="bg-surface rounded-2xl px-4">
        <Pressable
          onPress={() => Linking.openURL('tel:1393')}
          className="active:opacity-70"
          accessibilityRole="button"
          accessibilityLabel="자살예방상담전화 1393"
        >
          <Row label="자살예방상담전화" value="1393" />
        </Pressable>
        <Pressable
          onPress={() => Linking.openURL('tel:109')}
          className="active:opacity-70"
          accessibilityRole="button"
          accessibilityLabel="정신건강 위기상담전화 109"
        >
          <Row label="정신건강 위기상담" value="109" />
        </Pressable>
      </View>
    </View>
  );
}
