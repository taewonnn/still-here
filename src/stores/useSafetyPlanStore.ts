import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SafetyPlan } from '@/types';

const STORAGE_KEY = 'safety_plan';

type SafetyPlanStore = {
  plan: SafetyPlan | null;
  loadPlan: () => Promise<void>;
  savePlan: (plan: SafetyPlan) => Promise<void>;
};

export const useSafetyPlanStore = create<SafetyPlanStore>((set) => ({
  plan: null,

  loadPlan: async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const plan: SafetyPlan | null = raw ? JSON.parse(raw) : null;
    set({ plan });
  },

  savePlan: async (plan: SafetyPlan) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    set({ plan });
  },
}));
