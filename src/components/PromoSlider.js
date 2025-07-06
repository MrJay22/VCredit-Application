import React from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';

export default function PromoSlider() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.slider}>
      {[1, 2, 3].map((_, idx) => (
        <Image
          key={idx}
          source={{ uri: 'https://via.placeholder.com/300x120.png?text=Promo+Banner' }}
          style={styles.image}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  slider: {
    marginVertical: 24,
    marginHorizontal: 16,
  },
  image: {
    width: 300,
    height: 120,
    borderRadius: 12,
    marginRight: 16,
  },
});
