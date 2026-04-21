import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CheckInRecord } from '@/types';

const STORAGE_KEY = 'checkin_records';

type CheckInStore = {
  records: CheckInRecord[];
  isCheckedInToday: boolean;
  streak: number;
  loadRecords: () => Promise<void>;
  checkIn: () => Promise<void>;
};

const getTodayString = () => new Date().toISOString().split('T')[0];

const calculateStreak = (records: CheckInRecord[]): number => {
  if (records.length === 0) return 0;

  const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date));
  const today = getTodayString();

  let streak = 0;
  let current = new Date(today);

  for (const record of sorted) {
    const recordDate = current.toISOString().split('T')[0];
    if (record.date === recordDate) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

export const useCheckInStore = create<CheckInStore>((set, get) => ({
  records: [],
  isCheckedInToday: false,
  streak: 0,

  loadRecords: async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const records: CheckInRecord[] = raw ? JSON.parse(raw) : [];
    const today = getTodayString();
    const isCheckedInToday = records.some((r) => r.date === today);
    const streak = calculateStreak(records);
    set({ records, isCheckedInToday, streak });
  },

  checkIn: async () => {
    const today = getTodayString();
    const { records, isCheckedInToday } = get();
    if (isCheckedInToday) return;

    const newRecord: CheckInRecord = { date: today, timestamp: Date.now() };
    const updated = [...records, newRecord];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    const streak = calculateStreak(updated);
    set({ records: updated, isCheckedInToday: true, streak });
  },
}));
