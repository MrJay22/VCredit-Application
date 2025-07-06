import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const RepayLoanScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const loan = params?.loan;

  if (!loan) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No running loan found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Running Loan</Text>

      <View style={styles.card}>
        <Text style={styles.item}><Text style={styles.label}>Loan ID:</Text> {loan.loanId}</Text>
        <Text style={styles.item}><Text style={styles.label}>Amount:</Text> ₦{loan.amount.toLocaleString()}</Text>
        <Text style={styles.item}><Text style={styles.label}>Total Repayment:</Text> ₦{loan.totalRepayment.toLocaleString()}</Text>
        <Text style={styles.item}><Text style={styles.label}>Due Date:</Text> {new Date(loan.dueDate).toDateString()}</Text>
        <Text style={styles.item}><Text style={styles.label}>Status:</Text> {loan.status}</Text>
        {loan.overdueDays > 0 && (
          <>
            <Text style={styles.item}><Text style={styles.label}>Overdue:</Text> {loan.overdueDays} days</Text>
            <Text style={styles.item}><Text style={styles.label}>Overdue Interest:</Text> ₦{loan.overdueInterest.toLocaleString()}</Text>
          </>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RepaymentGateway')}>
        <Text style={styles.buttonText}>Repay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RepayLoanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f6f4fd',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#b00020',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5E17EB',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    marginBottom: 30,
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
