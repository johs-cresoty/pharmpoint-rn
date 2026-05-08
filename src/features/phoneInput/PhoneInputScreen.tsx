import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type PhoneInputMode = 'Save' | 'Lookup' | 'CatRequestNum' | 'CatRequestCustomer';

type Props = { mode: PhoneInputMode };

export default function PhoneInputScreen(_props: Props) {
  return (
    <View style={styles.container}>
      <Text>PhoneInput</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
