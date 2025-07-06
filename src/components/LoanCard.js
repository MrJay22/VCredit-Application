import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';

export default function LoanCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Loan Status</Text>
      <Text style={styles.amount}>Eligible for ₦20,000</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Apply Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: 50,
    borderRadius: 16,
    marginTop: -50,
    marginHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.text,
  },
  amount: {
    fontSize: 22,
    marginVertical: 10,
    color: colors.purple,
  },
  button: {
    backgroundColor: colors.purple,
    padding: 12,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
  },
});
