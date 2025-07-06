import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PersonalDetailsScreen from './PersonalDetailsScreen';
import GuarantorsScreen from './GuarantorsScreen';
import ReviewAndSubmitScreen from './ReviewAndSubmitScreen';

const Stack = createStackNavigator();

export default function LoanApplyNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="PersonalDetailsScreen" component={PersonalDetailsScreen} options={{ title: 'Your Details' }} />
      <Stack.Screen name="GuarantorsScreen" component={GuarantorsScreen} options={{ title: 'Guarantors' }} />
  
      <Stack.Screen name="ReviewAndSubmitScreen" component={ReviewAndSubmitScreen} options={{ title: 'Review & Submit' }} />
    </Stack.Navigator>
  );
}
