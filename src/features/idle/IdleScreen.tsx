import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from 'react-native';
import { useConfigStore } from '@shared/store/configStore';
import SettingModal from '@features/setting/SettingModal';
import { useIdle } from './hooks/useIdle';

type ThemeConfig = {
  bg: string;
  btnBg: string;
  btnText: string;
  subTitleColor: string;
};

const THEMES: ThemeConfig[] = [
  { bg: '#1565C0', btnBg: '#FFFFFF', btnText: '#1565C0', subTitleColor: '#FFFFFF' }, // 0 Blue
  { bg: '#2E7D32', btnBg: '#FFFFFF', btnText: '#2E7D32', subTitleColor: '#FFFFFF' }, // 1 Green
  { bg: '#6A1B9A', btnBg: '#FFFFFF', btnText: '#6A1B9A', subTitleColor: '#FFFFFF' }, // 2 Purple
  { bg: '#B71C1C', btnBg: '#FFFFFF', btnText: '#B71C1C', subTitleColor: '#FFFFFF' }, // 3 Red
  { bg: '#E65100', btnBg: '#FFFFFF', btnText: '#E65100', subTitleColor: '#FFFFFF' }, // 4 Orange
  { bg: '#006064', btnBg: '#FFFFFF', btnText: '#006064', subTitleColor: '#FFFFFF' }, // 5 Teal (커스텀 이미지 시 덮어씀)
];

export default function IdleScreen() {
  const { themeIndex, subTitle, customImageUri } = useConfigStore();

  const {
    showPasswordDialog,
    showSettingModal,
    handleScreenTap,
    handleBalancePress,
    handlePasswordConfirm,
    handlePasswordDismiss,
    handleSettingClose,
  } = useIdle();

  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const theme = THEMES[themeIndex] ?? THEMES[0];
  const hasCustomImage = themeIndex === 5 && customImageUri != null;

  const handleConfirmPress = () => {
    const ok = handlePasswordConfirm(passwordInput);
    if (ok) {
      setPasswordInput('');
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleDismissPress = () => {
    setPasswordInput('');
    setPasswordError(false);
    handlePasswordDismiss();
  };

  return (
    <View style={styles.root}>
      <TouchableWithoutFeedback onPress={handleScreenTap}>
        <View style={[styles.container, !hasCustomImage && { backgroundColor: theme.bg }]}>
          {/* 커스텀 이미지 배경 (themeIndex === 5) */}
          {hasCustomImage && (
            <Image
              source={{ uri: customImageUri! }}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
          )}

          {/* 서브타이틀 */}
          <View style={styles.center}>
            {subTitle ? (
              <Text style={[styles.subTitle, { color: theme.subTitleColor }]}>
                {subTitle}
              </Text>
            ) : null}
          </View>

          {/* 포인트 잔액 조회 버튼 */}
          <View style={styles.bottom}>
            <TouchableOpacity
              style={[styles.balanceButton, { backgroundColor: theme.btnBg }]}
              onPress={handleBalancePress}
              activeOpacity={0.85}
            >
              <Text style={[styles.balanceButtonText, { color: theme.btnText }]}>
                포인트 잔액 조회
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* 비밀번호 다이얼로그 */}
      <Modal
        visible={showPasswordDialog}
        transparent
        animationType="fade"
        onRequestClose={handleDismissPress}
      >
        <TouchableWithoutFeedback onPress={handleDismissPress}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.dialog}>
                <Text style={styles.dialogTitle}>비밀번호 입력</Text>
                <TextInput
                  style={[styles.input, passwordError && styles.inputError]}
                  value={passwordInput}
                  onChangeText={text => {
                    setPasswordInput(text);
                    setPasswordError(false);
                  }}
                  onSubmitEditing={handleConfirmPress}
                  secureTextEntry
                  keyboardType="number-pad"
                  maxLength={8}
                  autoFocus
                  placeholder="비밀번호"
                  placeholderTextColor="#999"
                />
                {passwordError && (
                  <Text style={styles.errorText}>비밀번호가 일치하지 않습니다.</Text>
                )}
                <View style={styles.dialogButtons}>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={handleDismissPress}
                  >
                    <Text style={styles.cancelBtnText}>취소</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={handleConfirmPress}
                  >
                    <Text style={styles.confirmBtnText}>확인</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <SettingModal visible={showSettingModal} onClose={handleSettingClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  subTitle: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 1,
  },
  bottom: {
    paddingHorizontal: 32,
    paddingBottom: 48,
    alignItems: 'center',
  },
  balanceButton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  balanceButtonText: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  // 비밀번호 다이얼로그
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 28,
    width: 300,
    elevation: 8,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: '#212121',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: '#212121',
    letterSpacing: 4,
  },
  inputError: {
    borderColor: '#D32F2F',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 13,
    marginTop: 6,
  },
  dialogButtons: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#BDBDBD',
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 15,
    color: '#616161',
    fontWeight: '600',
  },
  confirmBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#1565C0',
    alignItems: 'center',
  },
  confirmBtnText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '700',
  },
});
