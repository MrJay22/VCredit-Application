import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';
import AirtimeScreen from '../screens/AirtimeScreen';
import FundWalletScreen from '../screens/FundWalletScreen';
import ApplyNowScreen from '../screens/ApplyNowScreen';
import DataScreen from '../screens/DataScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { AuthContext } from '../context/AuthContext';
import ProfileScreen from '../screens/ProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ContactSupportScreen from '../screens/ContactSupportScreen';
import PolicyScreen from '../screens/PolicyScreen';
import LoanVerificationScreen from '../screens/LoanVerificationScreen';
import LoanApplyNavigator from './LoanApplyNavigator'; // 👈 import
import LoanConfirmScreen from '../screens/loan/LoanConfirmScreen';
import RepayLoanScreen from '../screens/loan/RepayLoanScreen';
import LoanDetailsScreen from '../screens/loan/LoanDetailsScreen';
import RepaymentDetail from '../screens/RepaymentDetail';
import WalletScreen from '../screens/WalletScreen';
import RepaymentScreen from '../screens/RepaymentScreen';


const Stack = createStackNavigator();

export default function RootNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // or a loading indicator

  return (
      <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: false,
        headerStyle: {
          backgroundColor: '',
          height: 40, // Optional: customize header height
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerLeftContainerStyle: {
          paddingLeft: 15,
          marginTop:-30,
        },
        headerBackTitleVisible: false,
        headerLeft: () =>
          navigation.canGoBack() ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#5E17EB" />
            </TouchableOpacity>
          ) : null,
      })}
    >
      {!user ? (
        // Auth flow
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        // Main app flow
        <>
          <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
          <Stack.Screen
            name="ApplyNow"
            component={ApplyNowScreen}
            options={{ headerShown: false, title: '' }}
          />          
          <Stack.Screen
            name="LoanApprovalScreen"
            component={ApplyNowScreen}
            options={{ headerShown: false, title: '' }}
          /> 
          <Stack.Screen
            name="RepaymentDetails"
            component={RepaymentDetail}
            options={{ headerShown: false, title: '' }}
          />
          <Stack.Screen
            name="WalletScreen"
            component={WalletScreen}
            options={{ headerShown: false, title: '' }}
          />    
          <Stack.Screen
            name="RepaymentScreen"
            component={RepaymentScreen}
            options={{ headerShown: false, title: '' }}
          />              
          <Stack.Screen
            name="VerifyProfile"
            component={LoanApplyNavigator}
            options={{ headerShown: false }} // we already show headers inside the nested stack
          />
          <Stack.Screen
            name="LoanConfirmScreen"
            component={LoanConfirmScreen}
            options={{ headerShown: false }} // we already show headers inside the nested stack
          />     
          <Stack.Screen
            name="RepayLoanScreen"
            component={RepayLoanScreen}
            options={{ headerShown: false }} // we already show headers inside the nested stack
          />    
          <Stack.Screen
            name="LoanDetailsScreen"
            component={LoanDetailsScreen}
            options={{ headerShown: false }} // we already show headers inside the nested stack
          />  
          <Stack.Screen
            name="DataScreen"
            component={DataScreen}
            options={{ headerShown: false, title: 'Buy Data' }}
          />
          <Stack.Screen
            name="AirtimeScreen"
            component={AirtimeScreen}
            options={{ headerShown: false, title: 'Buy Airtime' }}
          />
          <Stack.Screen
            name="FundWalletScreen"
            component={FundWalletScreen}
            options={{ headerShown: true, title: 'Fund Wallet' }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ headerShown: true, title: 'My Profile' }}
          />
          <Stack.Screen
            name="ChangePasswordScreen"
            component={ChangePasswordScreen}
            options={{ headerShown: true, title: 'Change Password' }}
          />
          <Stack.Screen
            name="NotificationsScreen"
            component={NotificationsScreen}
            options={{ headerShown: true, title: 'Notifications' }}
          />
          <Stack.Screen
            name="ContactSupportScreen"
            component={ContactSupportScreen}
            options={{ headerShown: true, title: 'Customer Support' }}
          />
          <Stack.Screen
            name="PolicyScreen"
            component={PolicyScreen}
            options={{ headerShown: true, title: 'Policies' }}
          />
          <Stack.Screen
            name="LoanVerificationScreen"
            component={LoanVerificationScreen}
            options={{ headerShown: true, title: 'Loan Verification' }}
          />

        </>
      )}
    </Stack.Navigator>
  );
}
