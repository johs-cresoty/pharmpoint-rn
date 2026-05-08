import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({ id: 'pharmpoint-storage' });

export const StorageKey = {
  STORE_NAME: 'STORE_NAME',
  BIZ_NO: 'BIZ_NO',
  SUB_TITLE: 'SUB_TITLE',
  CUSTOM_IMAGE_URI: 'CUSTOM_IMAGE_URI',
  MAIN_THEME: 'MAIN_THEME',
  MINIMUM_POINT: 'MINIMUM_POINT',
  SCREEN_TIMEOUT: 'SCREEN_TIMEOUT',
  MIN_AMOUNT: 'MIN_AMOUNT',
  IS_IDENTIFICATION: 'IS_IDENTIFICATION',
  IS_MIN_POINT_ENABLED: 'IS_MIN_POINT_ENABLED',
  IS_SAVE: 'IS_SAVE',
  BRIGHTNESS: 'BRIGHTNESS',
  PASSWORD: 'PASSWORD',
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
} as const;

export type StorageKeyType = (typeof StorageKey)[keyof typeof StorageKey];

export function getValue(key: StorageKeyType): string | undefined {
  return storage.getString(key);
}

export function setValue(key: StorageKeyType, value: string): void {
  storage.set(key, value);
}

export function removeValue(key: StorageKeyType): void {
  storage.delete(key);
}
