import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import colors from '../theme/colors';

export default function MainLayout({ children, firstName = 'User' }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')} // Replace with your logo path
          style={styles.logo}
        />
        <Text style={styles.greeting}>Hi, {firstName} 👋</Text>
      </View>

      {/* Screen content */}
      <View style={styles.body}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  greeting: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  body: {
    flex: 1,
  },
});
