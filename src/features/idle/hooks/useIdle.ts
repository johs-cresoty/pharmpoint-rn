import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@granite-js/react-native';
import SystemSetting from 'react-native-system-setting';
import { useConfigStore } from '@shared/store/configStore';

const TRIPLE_TAP_WINDOW_MS = 1000;
const TRIPLE_TAP_COUNT = 3;

export function useIdle() {
  const navigation = useNavigation();
  const { bizNo, brightness } = useConfigStore();

  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showSettingModal, setShowSettingModal] = useState(false);

  const tapTimestamps = useRef<number[]>([]);

  // 화면 항상 켜짐: 앱 밝기를 configStore 값으로 고정하고 언마운트 시 복원
  useEffect(() => {
    SystemSetting.saveBrightness();
    SystemSetting.setAppBrightness(brightness);
    return () => {
      SystemSetting.restoreBrightness();
    };
  }, [brightness]);

  const handleScreenTap = useCallback(() => {
    const now = Date.now();
    const recent = tapTimestamps.current.filter(
      t => now - t < TRIPLE_TAP_WINDOW_MS,
    );
    recent.push(now);
    tapTimestamps.current = recent;

    if (recent.length >= TRIPLE_TAP_COUNT) {
      tapTimestamps.current = [];
      if (bizNo) {
        setShowPasswordDialog(true);
      } else {
        setShowSettingModal(true);
      }
    }
  }, [bizNo]);

  const handleBalancePress = useCallback(() => {
    navigation.navigate('/point-balance');
  }, [navigation]);

  // 비밀번호 확인 후 성공 여부 반환 (UI에서 에러 표시용)
  const handlePasswordConfirm = useCallback((input: string): boolean => {
    const stored = useConfigStore.getState().password;
    if (input === stored) {
      setShowPasswordDialog(false);
      setShowSettingModal(true);
      return true;
    }
    return false;
  }, []);

  const handlePasswordDismiss = useCallback(() => {
    setShowPasswordDialog(false);
  }, []);

  const handleSettingClose = useCallback(() => {
    setShowSettingModal(false);
  }, []);

  return {
    showPasswordDialog,
    showSettingModal,
    handleScreenTap,
    handleBalancePress,
    handlePasswordConfirm,
    handlePasswordDismiss,
    handleSettingClose,
  };
}
