import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Settings } from '@/types';

const STORAGE_KEY = 'settings';

const DEFAULT_SETTINGS: Settings = {
  notificationTime: '21:00',
  notificationsEnabled: true,
  darkMode: true,
};

type SettingsStore = {
  settings: Settings;
  loadSettings: () => Promise<void>;
  updateSettings: (partial: Partial<Settings>) => Promise<void>;
};

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: DEFAULT_SETTINGS,

  loadSettings: async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const settings: Settings = raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
    set({ settings });
  },

  updateSettings: async (partial) => {
    const updated = { ...get().settings, ...partial };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ settings: updated });
  },
}));
