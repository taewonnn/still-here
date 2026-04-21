export type CheckInRecord = {
  date: string; // YYYY-MM-DD
  timestamp: number;
};

export type Contact = {
  id: string;
  name: string;
  phone: string;
  messageTemplate: string;
};

export type SafetyPlan = {
  warningSignals: string;
  calmingActions: string;
  safePlace: string;
  contactPerson: string;
  reasonToStay: string;
};

export type Settings = {
  notificationTime: string; // HH:mm
  notificationsEnabled: boolean;
  darkMode: boolean;
};
