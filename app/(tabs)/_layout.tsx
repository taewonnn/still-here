import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';

type TabIconProps = {
  label: string;
  focused: boolean;
};

const TabIcon = ({ label, focused }: TabIconProps) => (
  <View className="items-center justify-center pt-1">
    <Text className={`text-xs mt-1 ${focused ? 'text-primary' : 'text-text-muted'}`}>
      {label}
    </Text>
  </View>
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: '#242424',
          height: 64,
        },
        tabBarActiveTintColor: '#a8d5a2',
        tabBarInactiveTintColor: '#5a5a5a',
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="홈" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="safety-plan"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="버팀목" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="연락처" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="설정" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
