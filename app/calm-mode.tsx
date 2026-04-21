import { useState, useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useContactsStore } from '@/stores/useContactsStore';
import { Linking } from 'react-native';
import { CALM_MESSAGES } from '@/constants/calmMessages';

type Step = 'choose' | 'breathe' | 'move' | 'contact';

const BREATHE_MESSAGES = [
  '지금 머릿속이 너무 빠르게 돌아가고 있을 수 있어.\n잠깐, 호흡만 따라와봐. 10초면 돼.',
  '숨을 고르는 것만으로도 뇌가 조금 쉴 수 있어.\n딱 한 번만 같이 해보자.',
  '지금 이 순간, 숨쉬는 것 말고는 아무것도 안 해도 돼.\n그냥 따라와.',
  '몸이 먼저야. 생각은 잠깐 내려놔도 괜찮아.\n숨만 같이 쉬어보자.',
];

const MOVE_MESSAGES = [
  '지금 있는 공간이 너무 무거울 수 있어.\n몸을 움직이는 것만으로도 달라질 수 있어.',
  '자리를 바꾸는 게 별거 아닌 것 같아도,\n뇌한테는 꽤 큰 신호야.',
  '일어나서 물 한 잔만 마셔봐.\n그게 지금 할 수 있는 충분한 행동이야.',
  '창가나 다른 방으로 이동해봐.\n환경이 바뀌면 마음도 조금 달라질 수 있어.',
];

const CONTACT_MESSAGES = [
  '혼자 버티지 않아도 돼.\n아무 말 안 해도 괜찮아. 그냥 연결되는 것만으로도 충분해.',
  '"힘들어"라는 말 한마디면 충분해.\n설명 안 해도 돼.',
  '지금 연락하는 게 민폐가 아니야.\n진짜로.',
  '누군가 목소리를 듣는 것만으로도\n지금 이 무게가 조금 가벼워질 수 있어.',
];

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export default function CalmModeScreen() {
  const [step, setStep] = useState<Step>('choose');
  const [breathCount, setBreathCount] = useState(0);
  const contacts = useContactsStore((s) => s.contacts);

  const messages = useMemo(() => ({
    breathe: pick(BREATHE_MESSAGES),
    move: pick(MOVE_MESSAGES),
    contact: pick(CONTACT_MESSAGES),
    calm: pick(CALM_MESSAGES),
  }), []);

  const handleBreathe = () => {
    if (breathCount < 3) {
      setBreathCount((c) => c + 1);
    } else {
      router.back();
    }
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleText = (phone: string, message: string) => {
    Linking.openURL(`sms:${phone}?body=${encodeURIComponent(message)}`);
  };

  if (step === 'breathe') {
    return (
      <View className="flex-1 bg-background items-center justify-center px-8 gap-10">
        <Text className="text-text-muted text-sm tracking-widest">숨 고르기</Text>
        <Text className="text-text-primary text-2xl font-semibold text-center leading-10">
          {breathCount === 0
            ? '천천히 숨을 들이쉬어.'
            : breathCount === 1
            ? '잠깐 멈춰.'
            : breathCount === 2
            ? '천천히 내쉬어.'
            : '잘했어. 한 번 더 해볼까?'}
        </Text>

        <Pressable
          onPress={handleBreathe}
          className="w-40 h-40 rounded-full bg-surface-2 border-2 border-primary items-center justify-center active:bg-surface"
          accessibilityRole="button"
          accessibilityLabel="탭해서 다음 단계"
        >
          <Text className="text-primary text-sm">탭</Text>
        </Pressable>

        <Pressable
          onPress={() => router.back()}
          className="py-3 active:opacity-70"
          accessibilityRole="button"
        >
          <Text className="text-text-muted">나가기</Text>
        </Pressable>
      </View>
    );
  }

  if (step === 'move') {
    return (
      <View className="flex-1 bg-background items-center justify-center px-8 gap-8">
        <Text className="text-text-muted text-sm tracking-widest">자리 바꾸기</Text>
        <Text className="text-text-primary text-xl font-semibold text-center leading-9">
          지금 있는 곳에서{'\n'}다른 방이나 창가로{'\n'}이동해봐.
        </Text>
        <Text className="text-text-secondary text-base text-center leading-7">
          물 한 잔 마셔도 좋아.{'\n'}그게 전부야.
        </Text>

        <Pressable
          onPress={() => router.back()}
          className="bg-primary rounded-2xl px-10 py-4 mt-4 active:opacity-80"
          accessibilityRole="button"
        >
          <Text className="text-background font-semibold">알겠어</Text>
        </Pressable>
      </View>
    );
  }

  if (step === 'contact') {
    return (
      <View className="flex-1 bg-background px-6 pt-16 pb-8">
        <Text className="text-text-muted text-sm tracking-widest mb-6">연락하기</Text>
        <Text className="text-text-primary text-xl font-semibold mb-8">
          지금 연락할 수 있는 사람이야.
        </Text>

        <View className="gap-4 flex-1">
          {contacts.length === 0 ? (
            <View className="flex-1 items-center justify-center gap-4">
              <Text className="text-text-muted text-center">
                등록된 연락처가 없어.{'\n'}설정에서 추가해봐.
              </Text>
              <Pressable
                onPress={() => {
                  router.back();
                  router.push('/(tabs)/contacts');
                }}
                className="bg-surface rounded-2xl px-8 py-4 active:opacity-80"
                accessibilityRole="button"
              >
                <Text className="text-text-secondary">연락처 추가하러 가기</Text>
              </Pressable>
            </View>
          ) : (
            contacts.map((contact) => (
              <View key={contact.id} className="bg-surface rounded-2xl p-4 gap-3">
                <Text className="text-text-primary text-lg font-semibold">{contact.name}</Text>
                <View className="flex-row gap-3">
                  <Pressable
                    onPress={() => handleCall(contact.phone)}
                    className="flex-1 bg-primary rounded-xl py-3 items-center active:opacity-80"
                    accessibilityRole="button"
                    accessibilityLabel={`${contact.name}에게 전화하기`}
                  >
                    <Text className="text-background font-medium">전화</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleText(contact.phone, contact.messageTemplate)}
                    className="flex-1 bg-surface-2 rounded-xl py-3 items-center active:opacity-80"
                    accessibilityRole="button"
                    accessibilityLabel={`${contact.name}에게 문자 보내기`}
                  >
                    <Text className="text-text-secondary font-medium">문자</Text>
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </View>

        <Pressable
          onPress={() => router.back()}
          className="py-4 items-center active:opacity-70 mt-4"
          accessibilityRole="button"
        >
          <Text className="text-text-muted">나가기</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background px-6 pt-16 pb-8">
      <View className="gap-3">
        <Text className="text-text-muted text-sm tracking-widest">지금 힘들어요</Text>
        <Text className="text-text-primary text-2xl font-bold">뭘 하면 좋을까?</Text>
        <Text className="text-text-secondary text-base">하나만 골라봐. 지금 할 수 있는 걸로.</Text>
      </View>

      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-text-primary text-xl font-medium text-center leading-9">
          {messages.calm}
        </Text>
      </View>

      <View className="gap-4">
        <Pressable
          onPress={() => setStep('breathe')}
          className="bg-surface rounded-2xl p-6 gap-3 active:opacity-80"
          accessibilityRole="button"
        >
          <Text className="text-primary text-lg font-semibold">숨 고르기</Text>
          <Text className="text-text-secondary text-sm leading-6">{messages.breathe}</Text>
        </Pressable>

        <Pressable
          onPress={() => setStep('move')}
          className="bg-surface rounded-2xl p-6 gap-3 active:opacity-80"
          accessibilityRole="button"
        >
          <Text className="text-primary text-lg font-semibold">물 마시기 / 자리 이동</Text>
          <Text className="text-text-secondary text-sm leading-6">{messages.move}</Text>
        </Pressable>

        <Pressable
          onPress={() => setStep('contact')}
          className="bg-surface rounded-2xl p-6 gap-3 active:opacity-80"
          accessibilityRole="button"
        >
          <Text className="text-primary text-lg font-semibold">연락하기</Text>
          <Text className="text-text-secondary text-sm leading-6">{messages.contact}</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => router.back()}
        className="py-4 items-center active:opacity-70"
        accessibilityRole="button"
      >
        <Text className="text-text-muted">그냥 닫기</Text>
      </Pressable>
    </View>
  );
}
