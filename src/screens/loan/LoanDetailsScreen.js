import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const LoanDetailsScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const loan = params?.loan;

  if (!loan) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 16, color: '#555' }}>No loan data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#5E17EB" />
      </TouchableOpacity>

      <Text style={styles.heading}>Loan Details</Text>

      <View style={styles.card}>
        <Text style={styles.item}><Text style={styles.label}>Loan ID:</Text> {loan.loanId}</Text>
        <Text style={styles.item}><Text style={styles.label}>Amount:</Text> ₦{loan.amount.toLocaleString()}</Text>
        <Text style={styles.item}><Text style={styles.label}>Interest:</Text> ₦{loan.interest.toLocaleString()}</Text>
        <Text style={styles.item}><Text style={styles.label}>Total Repayment:</Text> ₦{loan.totalRepayment.toLocaleString()}</Text>
        <Text style={styles.item}><Text style={styles.label}>Amount Repaid:</Text> ₦{loan.amountRepaid?.toLocaleString() || 0}</Text>
        <Text style={styles.item}><Text style={styles.label}>Due Date:</Text> {new Date(loan.dueDate).toDateString()}</Text>
        <Text style={styles.item}><Text style={styles.label}>Date Initiated:</Text> {new Date(loan.dateInitiated).toDateString()}</Text>
        <Text style={styles.item}><Text style={styles.label}>Status:</Text> <Text style={[styles.status, styles[`status_${loan.status}`]]}>{loan.status}</Text></Text>
        <Text style={styles.item}><Text style={styles.label}>Overdue Days:</Text> {loan.overdueDays}</Text>
        <Text style={styles.item}><Text style={styles.label}>Overdue Interest:</Text> ₦{loan.overdueInterest.toLocaleString()}</Text>
      </View>
    </ScrollView>
  );
};

export default LoanDetailsScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5FF',
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5E17EB',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  item: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  label: {
    fontWeight: '600',
    color: '#6A0DAD',
  },
  status: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  status_processing: {
    color: '#FF8C00',
  },
  status_approved: {
    color: '#28a745',
  },
  status_cleared: {
    color: '#007bff',
  },
  status_declined: {
    color: '#d00000',
  },
  status_active: {
    color: '#6A0DAD',
  },
});
