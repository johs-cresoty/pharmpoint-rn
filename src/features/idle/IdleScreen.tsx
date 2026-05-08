import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Idle'>;

export default function IdleScreen(_props: Props) {
  return (
    <View style={styles.container}>
      <Text>Idle</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
