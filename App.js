import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/appNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      
        <AuthProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      
    </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
