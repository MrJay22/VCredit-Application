import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const networks = [
  { id: 'mtn', name: 'MTN', logo: require('../assets/mtn.jpg') },
  { id: 'airtel', name: 'Airtel', logo: require('../assets/airtel.png') },
  { id: 'glo', name: 'Glo', logo: require('../assets/glo.jpg') },
  { id: '9mobile', name: '9mobile', logo: require('../assets/9mobile.png') },
];

export default function AirtimeScreen() {
  const [selectedNetwork, setSelectedNetwork] = useState('mtn');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    // Submit logic here
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Buy Airtime</Text>

      <Text style={styles.sectionLabel}>Select Network</Text>
      <View style={styles.networkRow}>
        {networks.map((net) => (
          <TouchableOpacity
            key={net.id}
            onPress={() => setSelectedNetwork(net.id)}
            style={[styles.networkCard, selectedNetwork === net.id && styles.selectedNetwork]}
          >
            <Image source={net.logo} style={styles.networkLogo} />
            <Text style={styles.networkName}>{net.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Phone Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <Text style={styles.sectionLabel}>Amount</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="₦ Amount"
        value={amount}
        onChangeText={setAmount}
      />

      <View style={styles.noticeBoard}>
        <Text style={styles.noticeTitle}>Notice</Text>
        <Text style={styles.noticeText}>Glo airtime service is currently unavailable. Please try again later.</Text>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Buy Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F5FF',
    padding: 20,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#6A0DAD',
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
    marginTop: 14,
  },
  networkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  networkCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '23%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedNetwork: {
    borderColor: '#6A0DAD',
    borderWidth: 2,
  },
  networkLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  networkName: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  noticeBoard: {
    backgroundColor: '#fffbe6',
    borderLeftWidth: 4,
    borderLeftColor: '#f0ad4e',
    padding: 10,
    marginVertical: 20,
    borderRadius: 8,
  },
  noticeTitle: {
    fontWeight: 'bold',
    color: '#a87400',
    marginBottom: 4,
  },
  noticeText: {
    color: '#7c6700',
    fontSize: 13,
  },
  submitButton: {
    backgroundColor: '#6A0DAD',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
