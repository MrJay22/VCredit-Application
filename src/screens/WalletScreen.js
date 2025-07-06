import React, { useEffect, useState, useContext, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Clipboard,
  ScrollView, RefreshControl
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import api from '../api/client';

const WalletScreen = () => {
  const { user } = useContext(AuthContext);
  const [accountInfo, setAccountInfo] = useState(null);
  const [senderName, setSenderName] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [loanId, setLoanId] = useState('');
  const [loanShortId, setLoanShortId] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  

const fetchData = async () => {
  try {
    const [accountRes, loanRes] = await Promise.all([
      api.get('/api/loan/account', {
        headers: { Authorization: `Bearer ${user.token}` },
      }),
      api.get('/api/loan/repayment-info', {
        headers: { Authorization: `Bearer ${user.token}` },
      }),
    ]);

    setAccountInfo(accountRes.data);

    if (loanRes.data.loan) {
      setLoanId(loanRes.data.loan.id); // numeric id
      setLoanShortId(loanRes.data.loan.loanId); // short code e.g. LN1234
    }
  } catch (err) {
    console.error('Error fetching wallet data:', err);
    Alert.alert('Error', 'Could not load wallet data');
  } finally {
    setRefreshing(false);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleCopy = (text) => {
    Clipboard.setString(text);
    Alert.alert('Copied', 'Account number copied to clipboard');
  };

  const handleSubmit = async () => {
  if (!senderName.trim() || !amount || !note.trim() || !loanId || !loanShortId) {
    return Alert.alert('Missing Info', 'Please fill all fields');
  }

  try {
    await api.post(
      '/api/loan/manual-repay',
      { senderName, amount, note, loanId, loanShortId },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );

    Alert.alert('Submitted', 'Your payment info has been submitted.');
    setSenderName('');
    setAmount('');
    setNote('');
  } catch (err) {
    console.error('Submit error:', err);
    Alert.alert('Error', 'Submission failed.');
  }
};

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}
    >

      <Text style={styles.header}>Repay Your Loan</Text>

      {accountInfo && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Bank Account for Repayment</Text>

          <View style={styles.row}>
            <Ionicons name="business-outline" size={20} color="#6A0DAD" />
            <View style={styles.rowText}>
              <Text style={styles.label}>Bank Name</Text>
              <Text style={styles.value}>{accountInfo.bankName}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <MaterialIcons name="account-circle" size={20} color="#6A0DAD" />
            <View style={styles.rowText}>
              <Text style={styles.label}>Account Name</Text>
              <Text style={styles.value}>{accountInfo.accountName}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Ionicons name="card-outline" size={20} color="#6A0DAD" />
            <View style={styles.rowText}>
              <Text style={styles.label}>Account Number</Text>
              <View style={styles.copyRow}>
                <Text style={styles.value}>{accountInfo.accountNumber}</Text>
                <TouchableOpacity onPress={() => handleCopy(accountInfo.accountNumber)}>
                  <Text style={styles.copyText}>Copy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Sender's Name"
        value={senderName}
        onChangeText={setSenderName}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount Paid"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Payment Note (e.g., transfer ref, date)"
        value={note}
        onChangeText={setNote}
      />

      <Text style={styles.notice}>
  ⚠️ Make sure you’ve completed the bank transfer before submitting this form to avoid delay in clearing your loan.
      </Text>

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Payment Info</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 18,
    borderRadius: 14,
    marginBottom: 26,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  rowText: {
    marginLeft: 12,
    flex: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#777',
  },
  value: {
    fontSize: 16,
    color: '#222',
  },
  copyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  copyText: {
    color: '#5E17EB',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    fontSize: 15,
    backgroundColor: '#fafafa',
  },
  submitBtn: {
    backgroundColor: '#5E17EB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    notice: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffeeba',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 14,
    color: '#856404',
    fontSize: 14,
},
scrollContainer: {
  padding: 20,
  paddingBottom: 80,
  backgroundColor: '#fff',
},


});

export default WalletScreen;
