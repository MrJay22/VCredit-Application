import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../theme/colors';

const services = [
  { icon: 'cellphone', label: 'Airtime' },
  { icon: 'signal', label: 'Data' },
  { icon: 'flash', label: 'Electricity' },
  { icon: 'dots-horizontal', label: 'More' },
];

export default function QuickServices() {
  return (
    <View style={styles.container}>
      {services.map((s, i) => (
        <TouchableOpacity key={i} style={styles.box}>
          <MaterialCommunityIcons name={s.icon} size={28} color={colors.purple} />
          <Text style={styles.label}>{s.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 70,
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
});
