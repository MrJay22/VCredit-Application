import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'; // ✅ Required
import RootNavigator from '../src/navigation/appNavigator';
import { AuthProvider } from '../src/context/AuthContext';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthProvider>        
          <RootNavigator />        
        </AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
