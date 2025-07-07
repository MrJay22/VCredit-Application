import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/client';

export default function ReviewAndSubmitScreen({ navigation, route }) {
  const {
    name, phone, nin, bankName, accountNumber, accountName,
    dob, address, photo, guarantors,
  } = route.params;

  const guarantor1 = guarantors?.guarantor1 || {};
  const guarantor2 = guarantors?.guarantor2 || {};
  const emergencyContact = guarantors?.emergencyContact || {};
  const { user, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (
        !nin || !bankName || !accountNumber || !accountName ||
        !dob || !address || !photo || !guarantor1.name || !guarantor2.name
      ) {
        return Alert.alert('Incomplete', 'Please complete all required fields.');
      }

      setLoading(true);

      const payload = {
        personalDetails: {
          name: user.name,
          phone: user.phone,
          nin,
          bankName,
          accountNumber,
          accountName,
          dob,
          address,
        },
        photo,
        guarantor1,
        guarantor2,
      };

      await api.post('/api/loan/apply', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert('Success', 'Loan application submitted');
      navigation.reset({ index: 0, routes: [{ name: 'LoanApprovalScreen' }] });
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <Text style={styles.title}>Review Your Loan Application</Text>

      <View style={styles.headerRow}>
        <View style={styles.headerInfo}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.phoneText}>{phone}</Text>
        </View>
        {photo && (
          <Image source={{ uri: photo }} style={styles.profileImage} />
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <Info label="NIN" value={nin} />
        <Info label="Bank Name" value={bankName} />
        <Info label="Account Number" value={accountNumber} />
        <Info label="Account Name" value={accountName} />
        <Info label="Date of Birth" value={dob} />
        <Info label="Address" value={address} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Guarantor 1</Text>
        <Info label="Full Name" value={guarantor1.name} />
        <Info label="Phone Number" value={guarantor1.phone} />
        <Info label="Relationship" value={guarantor1.relationship} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Guarantor 2</Text>
        <Info label="Full Name" value={guarantor2.name} />
        <Info label="Phone Number" value={guarantor2.phone} />
        <Info label="Relationship" value={guarantor2.relationship} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Emergency Contact</Text>
        <Info label="Full Name" value={emergencyContact.name} />
        <Info label="Phone Number" value={emergencyContact.phone} />
        <Info label="Relationship" value={emergencyContact.relationship} />
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.goBack()}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submitButton, loading && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Application</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const Info = ({ label, value }) => (
  <View style={{ marginBottom: 10 }}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || 'N/A'}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F5FF',
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#6A0DAD',
    textAlign: 'center',
    marginTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerInfo: {
    flex: 1,
    marginRight: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
  },
  phoneText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#6A0DAD',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#ccc',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6A0DAD',
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    color: '#777',
  },
  value: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 35,
  },
  editButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#eee',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 15,
    color: '#555',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#6A0DAD',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
  },
});
