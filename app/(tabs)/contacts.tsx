import { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, Linking } from 'react-native';
import { useContactsStore } from '@/stores/useContactsStore';
import type { Contact } from '@/types';

const DEFAULT_MESSAGE = '지금 너무 힘들어서 연결이 필요해.';

type FormState = Omit<Contact, 'id'>;

const EMPTY_FORM: FormState = { name: '', phone: '', messageTemplate: DEFAULT_MESSAGE };

export default function ContactsScreen() {
  const { contacts, addContact, removeContact } = useContactsStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  const handleAdd = async () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    await addContact(form);
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  const handleCall = (phone: string) => Linking.openURL(`tel:${phone}`);
  const handleText = (phone: string, message: string) =>
    Linking.openURL(`sms:${phone}?body=${encodeURIComponent(message)}`);

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="px-6 pt-16 pb-12">
      <View className="flex-row justify-between items-center mb-8">
        <Text className="text-text-primary text-2xl font-bold">신뢰 연락처</Text>
        {contacts.length < 3 && !showForm && (
          <Pressable
            onPress={() => setShowForm(true)}
            accessibilityRole="button"
            accessibilityLabel="연락처 추가"
            className="active:opacity-70"
          >
            <Text className="text-primary text-base">+ 추가</Text>
          </Pressable>
        )}
      </View>

      <Text className="text-text-muted text-sm mb-6 leading-6">
        힘들 때 바로 연락할 수 있는 사람을{'\n'}최대 3명까지 등록할 수 있어.
      </Text>

      <View className="gap-4">
        {contacts.map((contact) => (
          <View key={contact.id} className="bg-surface rounded-2xl p-4 gap-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-text-primary text-lg font-semibold">{contact.name}</Text>
              <Pressable
                onPress={() => removeContact(contact.id)}
                accessibilityRole="button"
                accessibilityLabel={`${contact.name} 삭제`}
                className="active:opacity-70"
              >
                <Text className="text-text-muted text-sm">삭제</Text>
              </Pressable>
            </View>
            <Text className="text-text-muted text-sm">{contact.phone}</Text>
            <View className="flex-row gap-3">
              <Pressable
                onPress={() => handleCall(contact.phone)}
                className="flex-1 bg-primary rounded-xl py-3 items-center active:opacity-80"
                accessibilityRole="button"
                accessibilityLabel={`${contact.name}에게 전화`}
              >
                <Text className="text-background font-medium">전화</Text>
              </Pressable>
              <Pressable
                onPress={() => handleText(contact.phone, contact.messageTemplate)}
                className="flex-1 bg-surface-2 rounded-xl py-3 items-center active:opacity-80"
                accessibilityRole="button"
                accessibilityLabel={`${contact.name}에게 문자`}
              >
                <Text className="text-text-secondary font-medium">문자</Text>
              </Pressable>
            </View>
          </View>
        ))}

        {showForm && (
          <View className="bg-surface rounded-2xl p-4 gap-4">
            <Text className="text-text-secondary text-sm font-medium">새 연락처</Text>
            <TextInput
              value={form.name}
              onChangeText={(text) => setForm((f) => ({ ...f, name: text }))}
              placeholder="이름"
              placeholderTextColor="#5a5a5a"
              className="bg-surface-2 rounded-xl px-4 py-3 text-text-primary text-base"
              accessibilityLabel="연락처 이름"
            />
            <TextInput
              value={form.phone}
              onChangeText={(text) => setForm((f) => ({ ...f, phone: text }))}
              placeholder="전화번호"
              placeholderTextColor="#5a5a5a"
              keyboardType="phone-pad"
              className="bg-surface-2 rounded-xl px-4 py-3 text-text-primary text-base"
              accessibilityLabel="전화번호"
            />
            <TextInput
              value={form.messageTemplate}
              onChangeText={(text) => setForm((f) => ({ ...f, messageTemplate: text }))}
              placeholder="문자 템플릿"
              placeholderTextColor="#5a5a5a"
              multiline
              className="bg-surface-2 rounded-xl px-4 py-3 text-text-primary text-base min-h-16"
              accessibilityLabel="문자 메시지 템플릿"
            />
            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setShowForm(false)}
                className="flex-1 bg-surface-2 rounded-xl py-3 items-center active:opacity-80"
                accessibilityRole="button"
              >
                <Text className="text-text-secondary">취소</Text>
              </Pressable>
              <Pressable
                onPress={handleAdd}
                className="flex-1 bg-primary rounded-xl py-3 items-center active:opacity-80"
                accessibilityRole="button"
              >
                <Text className="text-background font-medium">저장</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
