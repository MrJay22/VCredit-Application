import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

const dummyHistory = [
  'Loan Approved - ₦20,000',
  'Payment Received - ₦5,000',
  'Loan Repaid Fully',
];

export default function LoanHistory() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Activities</Text>
      {dummyHistory.map((entry, i) => (
        <Text key={i} style={styles.entry}>• {entry}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 30,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  entry: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 6,
  },
});
