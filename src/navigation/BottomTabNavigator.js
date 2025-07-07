import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import WalletScreen from '../screens/WalletScreen';
import RepaymentScreen from '../screens/RepaymentScreen';
import AccountScreen from '../screens/AccountScreen';
import colors from '../theme/colors';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.purple,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Wallet':
              iconName = focused ? 'wallet' : 'wallet-outline';
              break;
            case 'Repayment':
              iconName = focused ? 'cash' : 'cash-outline';
              break;
            case 'Account':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }
          return <Ionicons name={iconName} size={28} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Wallet" component={WalletScreen} options={{ tabBarLabel: 'Wallet' }} />
      <Tab.Screen name="Repayment" component={RepaymentScreen} options={{ tabBarLabel: 'Repayment' }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ tabBarLabel: 'Account' }} />
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: Platform.OS === 'ios' ? 100 : 100,
    paddingBottom: Platform.OS === 'ios' ? 30 : 40, // 🔥 Increased to fix Android overlap
    paddingTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 4,
    elevation: 10,
  },
});



