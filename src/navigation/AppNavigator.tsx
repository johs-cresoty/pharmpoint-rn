import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IdleScreen from '@features/idle/IdleScreen';
import PhoneInputScreen from '@features/phoneInput/PhoneInputScreen';
import UsePointScreen from '@features/usePoint/UsePointScreen';
import ResultScreen from '@features/result/ResultScreen';
import PointBalanceScreen from '@features/pointBalance/PointBalanceScreen';

export type PhoneInputMode = 'Save' | 'Lookup' | 'CatRequestNum' | 'CatRequestCustomer';

export type RootStackParamList = {
  Idle: undefined;
  PhoneInput: { mode: PhoneInputMode };
  UsePoint: undefined;
  Result: undefined;
  PointBalance: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Idle"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Idle" component={IdleScreen} />
        <Stack.Screen name="PhoneInput" component={PhoneInputScreen} />
        <Stack.Screen name="UsePoint" component={UsePointScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="PointBalance" component={PointBalanceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
