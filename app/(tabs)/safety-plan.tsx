import { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { useSafetyPlanStore } from '@/stores/useSafetyPlanStore';
import type { SafetyPlan } from '@/types';

type Field = keyof SafetyPlan;

const FIELDS: { key: Field; label: string; placeholder: string }[] = [
  { key: 'warningSignals', label: '내가 힘들어질 때 신호', placeholder: '예: 잠을 못 자고, 아무것도 하기 싫어져...' },
  { key: 'calmingActions', label: '나를 진정시키는 행동', placeholder: '예: 산책하기, 음악 듣기, 샤워하기...' },
  { key: 'safePlace', label: '가면 안전한 장소', placeholder: '예: 카페, 도서관, 공원...' },
  { key: 'contactPerson', label: '연락할 사람', placeholder: '예: 친구 이름, 가족...' },
  { key: 'reasonToStay', label: '지금 버텨야 하는 이유', placeholder: '짧게 한 줄만 써도 돼.' },
];

export default function SafetyPlanScreen() {
  const { plan, savePlan } = useSafetyPlanStore();
  const [isEditing, setIsEditing] = useState(!plan);
  const [draft, setDraft] = useState<SafetyPlan>(
    plan ?? { warningSignals: '', calmingActions: '', safePlace: '', contactPerson: '', reasonToStay: '' }
  );

  const handleSave = async () => {
    await savePlan(draft);
    setIsEditing(false);
  };

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="px-6 pt-16 pb-12">
      <View className="flex-row justify-between items-center mb-8">
        <Text className="text-text-primary text-2xl font-bold">버팀목</Text>
        <Pressable
          onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
          accessibilityRole="button"
          accessibilityLabel={isEditing ? '저장' : '수정'}
          className="active:opacity-70"
        >
          <Text className="text-primary text-base">{isEditing ? '저장' : '수정'}</Text>
        </Pressable>
      </View>

      {!plan && !isEditing && (
        <Text className="text-text-muted text-base leading-7 mb-8">
          평소에 미리 써두면{'\n'}힘들 때 바로 꺼내볼 수 있어.
        </Text>
      )}

      <View className="gap-6">
        {FIELDS.map(({ key, label, placeholder }) => (
          <View key={key} className="gap-2">
            <Text className="text-text-secondary text-sm">{label}</Text>
            {isEditing ? (
              <TextInput
                value={draft[key]}
                onChangeText={(text) => setDraft((d) => ({ ...d, [key]: text }))}
                placeholder={placeholder}
                placeholderTextColor="#5a5a5a"
                multiline
                className="bg-surface rounded-xl px-4 py-4 text-text-primary text-base leading-6 min-h-16"
                accessibilityLabel={label}
              />
            ) : (
              <View className="bg-surface rounded-xl px-4 py-4 min-h-16 justify-center">
                <Text className={`text-base leading-6 ${draft[key] ? 'text-text-primary' : 'text-text-muted'}`}>
                  {draft[key] || placeholder}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
