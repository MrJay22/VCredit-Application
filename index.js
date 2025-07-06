import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from '../src/navigation/appNavigator';
import { AuthProvider } from '../src/context/AuthContext';

export default function App() {
   return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
    </GestureHandlerRootView>
  );

}