import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colors from '../theme/colors';

export default function TopBanner() {
  return (
    <View style={styles.container}>
      {/* Brand and Tagline on the same line */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/50x50.png?text=Logo' }} // Replace with actual logo image URL or local image
          style={styles.logo} 
        />
        <Text style={styles.brand}>OCredit</Text>
        <Text style={styles.tagline}></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.purple,  // Purple background for TopBanner
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 20,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row', // Align the logo, brand, and tagline in a row
    alignItems: 'center',  // Align logo and text vertically
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,  // Space between the logo and text
  },
  brand: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginRight: 10, // Space between the brand and tagline
  },
  tagline: {
    fontSize: 14,
    color: colors.white,
  },
});
