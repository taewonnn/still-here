import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Contact } from '@/types';

const STORAGE_KEY = 'contacts';

type ContactsStore = {
  contacts: Contact[];
  loadContacts: () => Promise<void>;
  addContact: (contact: Omit<Contact, 'id'>) => Promise<void>;
  updateContact: (contact: Contact) => Promise<void>;
  removeContact: (id: string) => Promise<void>;
};

const save = async (contacts: Contact[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
};

export const useContactsStore = create<ContactsStore>((set, get) => ({
  contacts: [],

  loadContacts: async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const contacts: Contact[] = raw ? JSON.parse(raw) : [];
    set({ contacts });
  },

  addContact: async (contact) => {
    const newContact: Contact = { ...contact, id: Date.now().toString() };
    const updated = [...get().contacts, newContact];
    await save(updated);
    set({ contacts: updated });
  },

  updateContact: async (contact) => {
    const updated = get().contacts.map((c) => (c.id === contact.id ? contact : c));
    await save(updated);
    set({ contacts: updated });
  },

  removeContact: async (id) => {
    const updated = get().contacts.filter((c) => c.id !== id);
    await save(updated);
    set({ contacts: updated });
  },
}));
