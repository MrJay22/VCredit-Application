import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const LoanConfirmScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const loan = params?.loan;

  if (!loan) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 16, color: '#555' }}>No loan details available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusBox}>
        <Ionicons name="time-outline" size={64} color="#5E17EB" />
        <Text style={styles.statusText}>Loan Status: Processing</Text>
        <Text style={styles.noticeText}>
          Your loan has been submitted and is currently under review.{"\n"}
          Please check back in less than 5 minutes — admin approval in progress.
        </Text>
      </View>

      <View style={styles.detailsBox}>
        <Text style={styles.item}>
          <Text style={styles.label}>Loan ID:</Text> {loan.loanId || 'N/A'}
        </Text>
        <Text style={styles.item}>
          <Text style={styles.label}>Amount:</Text> ₦{loan.amount?.toLocaleString?.() || '0'}
        </Text>
        <Text style={styles.item}>
          <Text style={styles.label}>Interest:</Text> ₦{loan.interest?.toLocaleString?.() || '0'}
        </Text>
        <Text style={styles.item}>
          <Text style={styles.label}>Total Repayment:</Text> ₦{loan.totalRepayment?.toLocaleString?.() || '0'}
        </Text>
        <Text style={styles.item}>
          <Text style={styles.label}>Due Date:</Text>{' '}
          {loan.dueDate ? new Date(loan.dueDate).toDateString() : 'N/A'}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainTabs')}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f4fd',
    padding: 24,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBox: {
    alignItems: 'center',
    marginBottom: 30,
  },
  statusText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5E17EB',
    marginTop: 10,
  },
  noticeText: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  detailsBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    elevation: 3,
  },
  item: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
    color: '#5E17EB',
  },
  button: {
    backgroundColor: '#5E17EB',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default LoanConfirmScreen;
