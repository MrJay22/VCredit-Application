import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PersonalDetailsScreen from '../screens/loan/PersonalDetailsScreen';
import GuarantorsScreen from '../screens/loan/GuarantorsScreen';
// import CapturePhotoScreen from '../screens/loan/CapturePhotoScreen';
import ReviewAndSubmitScreen from '../screens/loan/ReviewAndSubmitScreen';

const Stack = createStackNavigator();

export default function LoanApplyNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PersonalDetailsScreen" component={PersonalDetailsScreen} options={{ title: 'Your Details' }} />
      <Stack.Screen name="GuarantorsScreen" component={GuarantorsScreen} options={{ title: 'Guarantors' }} />
      {/* <Stack.Screen name="CapturePhotoScreen" component={CapturePhotoScreen} options={{ title: 'Passport Photo' }} /> */}
      <Stack.Screen name="ReviewAndSubmitScreen" component={ReviewAndSubmitScreen} options={{ title: 'Review & Submit' }} />
    </Stack.Navigator>
  );
}
