import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

const FundWalletScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fund Wallet Screen - Coming Soon!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 18, color: colors.purple, fontWeight: '600' },
});

export default FundWalletScreen;
