import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';

const networks = [
  { id: 'mtn', name: 'MTN', logo: require('../assets/mtn.jpg') },
  { id: 'airtel', name: 'Airtel', logo: require('../assets/airtel.png') },
  { id: 'glo', name: 'Glo', logo: require('../assets/glo.jpg') },
  { id: '9mobile', name: '9mobile', logo: require('../assets/9mobile.png') },
];

const categories = ['Hot', 'Daily', 'Weekly', 'Monthly'];

const dummyPlans = {
  mtn: {
    Hot: [
      { id: 1, size: '1.5GB', price: '₦300', validity: '1 Day' },
      { id: 2, size: '3GB', price: '₦500', validity: '1 Day' },
      { id: 3, size: '5GB', price: '₦800', validity: '2 Days' },
      { id: 4, size: '7GB', price: '₦1000', validity: '3 Days' },
    ],
    Daily: [
      { id: 5, size: '500MB', price: '₦100', validity: '1 Day' },
      { id: 6, size: '1GB', price: '₦200', validity: '1 Day' },
      { id: 7, size: '2GB', price: '₦350', validity: '1 Day' },
      { id: 8, size: '3GB', price: '₦500', validity: '1 Day' },
    ],
    Weekly: [
      { id: 9, size: '1.5GB', price: '₦500', validity: '7 Days' },
      { id: 10, size: '4GB', price: '₦1200', validity: '7 Days' },
      { id: 11, size: '5GB', price: '₦1500', validity: '7 Days' },
      { id: 12, size: '6GB', price: '₦1800', validity: '7 Days' },
    ],
    Monthly: [
      { id: 13, size: '5GB', price: '₦1500', validity: '30 Days' },
      { id: 14, size: '10GB', price: '₦3000', validity: '30 Days' },
      { id: 15, size: '15GB', price: '₦4500', validity: '30 Days' },
      { id: 16, size: '20GB', price: '₦6000', validity: '30 Days' },
    ],
  },
  airtel: {
    Hot: [
      { id: 17, size: '2GB', price: '₦400', validity: '1 Day' },
      { id: 18, size: '4GB', price: '₦600', validity: '2 Days' },
      { id: 19, size: '6GB', price: '₦900', validity: '3 Days' },
      { id: 20, size: '10GB', price: '₦1500', validity: '5 Days' },
    ],
    Daily: [
      { id: 21, size: '500MB', price: '₦100', validity: '1 Day' },
      { id: 22, size: '1GB', price: '₦200', validity: '1 Day' },
      { id: 23, size: '2GB', price: '₦350', validity: '1 Day' },
      { id: 24, size: '3GB', price: '₦500', validity: '1 Day' },
    ],
    Weekly: [
      { id: 25, size: '2GB', price: '₦600', validity: '7 Days' },
      { id: 26, size: '4GB', price: '₦1200', validity: '7 Days' },
      { id: 27, size: '6GB', price: '₦1800', validity: '7 Days' },
      { id: 28, size: '8GB', price: '₦2400', validity: '7 Days' },
    ],
    Monthly: [
      { id: 29, size: '10GB', price: '₦3000', validity: '30 Days' },
      { id: 30, size: '15GB', price: '₦4500', validity: '30 Days' },
      { id: 31, size: '20GB', price: '₦6000', validity: '30 Days' },
      { id: 32, size: '25GB', price: '₦7500', validity: '30 Days' },
    ],
  },
  glo: {
    Hot: [
      { id: 33, size: '2GB', price: '₦400', validity: '1 Day' },
      { id: 34, size: '4GB', price: '₦600', validity: '2 Days' },
      { id: 35, size: '6GB', price: '₦900', validity: '3 Days' },
      { id: 36, size: '10GB', price: '₦1500', validity: '5 Days' },
    ],
    Daily: [
      { id: 37, size: '500MB', price: '₦100', validity: '1 Day' },
      { id: 38, size: '1GB', price: '₦200', validity: '1 Day' },
      { id: 39, size: '2GB', price: '₦350', validity: '1 Day' },
      { id: 40, size: '3GB', price: '₦500', validity: '1 Day' },
    ],
    Weekly: [
      { id: 41, size: '2GB', price: '₦600', validity: '7 Days' },
      { id: 42, size: '4GB', price: '₦1200', validity: '7 Days' },
      { id: 43, size: '6GB', price: '₦1800', validity: '7 Days' },
      { id: 44, size: '8GB', price: '₦2400', validity: '7 Days' },
    ],
    Monthly: [
      { id: 45, size: '10GB', price: '₦3000', validity: '30 Days' },
      { id: 46, size: '15GB', price: '₦4500', validity: '30 Days' },
      { id: 47, size: '20GB', price: '₦6000', validity: '30 Days' },
      { id: 48, size: '25GB', price: '₦7500', validity: '30 Days' },
    ],
  },
  '9mobile': {
    Hot: [
      { id: 49, size: '2GB', price: '₦400', validity: '1 Day' },
      { id: 50, size: '4GB', price: '₦600', validity: '2 Days' },
      { id: 51, size: '6GB', price: '₦900', validity: '3 Days' },
      { id: 52, size: '10GB', price: '₦1500', validity: '5 Days' },
    ],
    Daily: [
      { id: 53, size: '500MB', price: '₦100', validity: '1 Day' },
      { id: 54, size: '1GB', price: '₦200', validity: '1 Day' },
      { id: 55, size: '2GB', price: '₦350', validity: '1 Day' },
      { id: 56, size: '3GB', price: '₦500', validity: '1 Day' },
    ],
    Weekly: [
      { id: 57, size: '2GB', price: '₦600', validity: '7 Days' },
      { id: 58, size: '4GB', price: '₦1200', validity: '7 Days' },
      { id: 59, size: '6GB', price: '₦1800', validity: '7 Days' },
      { id: 60, size: '8GB', price: '₦2400', validity: '7 Days' },
    ],
    Monthly: [
      { id: 61, size: '10GB', price: '₦3000', validity: '30 Days' },
      { id: 62, size: '15GB', price: '₦4500', validity: '30 Days' },
      { id: 63, size: '20GB', price: '₦6000', validity: '30 Days' },
      { id: 64, size: '25GB', price: '₦7500', validity: '30 Days' },
    ],
  },
};

export default function DataScreen() {
  const [selectedNetwork, setSelectedNetwork] = useState('mtn');
  const [selectedCategory, setSelectedCategory] = useState('Hot');
  const [phoneNumber, setPhoneNumber] = useState('');

  const plans = dummyPlans[selectedNetwork]?.[selectedCategory] || [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Buy Data</Text>

      <Text style={styles.sectionTitle}>Select Network</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
        {networks.map((net) => (
          <TouchableOpacity
            key={net.id}
            style={[styles.networkCard, selectedNetwork === net.id && styles.activeCard]}
            onPress={() => setSelectedNetwork(net.id)}
          >
            <Image source={net.logo} style={styles.logo} />
            <Text style={styles.networkText}>{net.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Select Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryButton, selectedCategory === cat && styles.activeCategory]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.planGrid}>
        {plans.map((plan) => (
          <TouchableOpacity key={plan.id} style={styles.planCard}>
            <Text style={styles.planSize}>{plan.size}</Text>
            <Text style={styles.planPrice}>{plan.price}</Text>
            <Text style={styles.planValidity}>{plan.validity}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Phone Number</Text>
      <TextInput
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyText}>Buy Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5FF', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#6A0DAD', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginVertical: 10, color: '#333' },
  horizontalList: { marginBottom: 10 },
  networkCard: {
    alignItems: 'center',
    marginRight: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  activeCard: { borderColor: '#6A0DAD', borderWidth: 2 },
  logo: { width: 40, height: 40, resizeMode: 'contain' },
  networkText: { fontSize: 12, marginTop: 5, color: '#333' },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'gray',
    borderRadius: 20,
    marginRight: 10,
  },
  activeCategory: { backgroundColor: '#6A0DAD' },
  categoryText: { color: '#fff', fontSize: 13, fontWeight: '500' },
  planGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
    marginVertical: 10,
  },
  planCard: {
    width: '23%',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 1,
  },
  planSize: { fontSize: 13, fontWeight: '600', color: '#000' },
  planPrice: { color: '#6A0DAD', fontWeight: '600', marginVertical: 2, fontSize: 12 },
  planValidity: { fontSize: 11, color: '#666' },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
  },
  buyButton: {
    backgroundColor: '#6A0DAD',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buyText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
