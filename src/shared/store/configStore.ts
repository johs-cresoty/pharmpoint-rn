import { create } from 'zustand';

interface ConfigState {
  bizNo: string;
  storeName: string;
  themeIndex: number;
  subTitle: string;
  customImageUri: string | null;
  timeout: number;
  minPoint: number;
  minAmount: number;
  isIdVerify: boolean;
  isMinPointEnabled: boolean;
  isSave: boolean;
  brightness: number;
  password: string;

  setConfig: (partial: Partial<Omit<ConfigState, 'setConfig'>>) => void;
}

export const useConfigStore = create<ConfigState>(set => ({
  bizNo: '',
  storeName: '',
  themeIndex: 0,
  subTitle: '',
  customImageUri: null,
  timeout: 30,
  minPoint: 0,
  minAmount: 0,
  isIdVerify: false,
  isMinPointEnabled: false,
  isSave: false,
  brightness: 1.0,
  password: '',

  setConfig: partial => set(state => ({ ...state, ...partial })),
}));
