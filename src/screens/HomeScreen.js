import React, { useContext, useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, Image, ScrollView, StyleSheet,
  Alert, RefreshControl
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '../api/client';

const services = [
  { name: 'Airtime', icon: <MaterialIcons name="flash-on" size={20} color="#6A0DAD" />, screen: 'AirtimeScreen' },
  { name: 'Data', icon: <FontAwesome5 name="wifi" size={20} color="#6A0DAD" />, screen: 'DataScreen' },
  { name: 'TV', icon: <Entypo name="tv" size={20} color="#6A0DAD" />, screen: 'TVScreen' },
  { name: 'More', icon: <MaterialIcons name="more-horiz" size={20} color="#6A0DAD" />, screen: 'MoreServicesScreen' },
];

const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [eligible, setEligible] = useState(user?.eligibleAmount ?? 250000);
  const [loanStatus, setLoanStatus] = useState('');
  const firstName = user?.name?.split(' ')[0] || 'User';

  const fetchEligibility = async () => {
    try {
      const res = await api.get('/api/loan/loan-status', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setEligible(res.data.eligibleAmount ?? 250000);
      setLoanStatus(res.data.status ?? '');
    } catch (error) {
      console.error('Refresh error:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEligibility();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchEligibility();
    }, [])
  );

  const handleApplyNow = async () => {
    try {
      const response = await api.get('/api/loan/loan-status', {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const { hasCompletedForm, status } = response.data;

      if (!hasCompletedForm) {
        return navigation.navigate('VerifyProfile');
      }

      if (status === 'pending') {
        return navigation.navigate('RepaymentScreen'); // pending approval
      }

      if (['running', 'overdue', 'active'].includes(status)) {
        return navigation.navigate('WalletScreen');
      }

      if (['declined', 'cleared'].includes(status) || !status) {
        return navigation.navigate('ApplyNow');
      }

      Alert.alert('Notice', 'Unexpected loan status: ' + status);
    } catch (error) {
      console.error('Loan status check failed:', error);
      Alert.alert('Error', 'Could not check loan status. Please try again.');
    }
  };

  const getButtonLabel = () => {
    if (loanStatus === 'pending') return 'Check Loan Status';
    if (['running', 'overdue', 'active'].includes(loanStatus)) return 'Repay Loan';
    if (['declined', 'cleared'].includes(loanStatus) || !loanStatus) return 'Apply for Loan';
    return 'Apply Now';
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.logo}>VCredit</Text>
        <Ionicons name="notifications-outline" size={26} color="#6A0DAD" />
      </View>

      <Text style={styles.greeting}>Hello, {firstName} 👋</Text>

      <View style={styles.eligibilityCard}>
        <Text style={styles.eligibilityText}>You're eligible for up to</Text>
        <Text style={styles.eligibilityAmount}>₦250,000</Text>
      </View>

      <View style={styles.ctaContainer}>
        <TouchableOpacity style={styles.ctaButtonOutline} onPress={handleApplyNow}>
          <Text style={styles.ctaTextOutline}>{getButtonLabel()}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.servicesRow}>
        {services.map((item) => (
          <TouchableOpacity
            style={styles.serviceItem}
            key={item.name}
            onPress={() => navigation.navigate(item.screen)}
          >
            {item.icon}
            <Text style={styles.serviceLabel}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.slider}>
        {[1, 2, 3].map((_, i) => (
          <Image
            key={i}
            source={{ uri: `https://via.placeholder.com/300x120?text=Promo+${i + 1}` }}
            style={styles.sliderImage}
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.chatButton}>
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5FF',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6A0DAD',
    letterSpacing: 1,
  },
  greeting: {
    fontSize: 20,
    color: '#222',
    fontWeight: '600',
  },
  eligibilityCard: {
    backgroundColor: '#f3e8ff',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 25,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  eligibilityText: {
    fontSize: 16,
    color: '#6A0DAD',
    marginBottom: 6,
    fontWeight: '500',
  },
  eligibilityAmount: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#6A0DAD',
  },
  ctaContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  ctaButtonOutline: {
    borderColor: '#6A0DAD',
    borderWidth: 1.5,
    paddingVertical: 14,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
  },
  ctaTextOutline: {
    color: '#6A0DAD',
    fontWeight: '600',
    fontSize: 15,
  },
  servicesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  serviceItem: {
    backgroundColor: '#fff',
    padding: 14,
    width: 70,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  serviceLabel: {
    fontSize: 11,
    color: '#444',
    marginTop: 5,
  },
  slider: {
    marginBottom: 25,
  },
  sliderImage: {
    width: 300,
    height: 120,
    borderRadius: 12,
    marginRight: 15,
  },
  chatButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#6A0DAD',
    padding: 16,
    borderRadius: 30,
    elevation: 4,
  },
});
