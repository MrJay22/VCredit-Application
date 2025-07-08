import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const GuarantorFormScreen = ({ navigation, route }) => {
  const [step, setStep] = useState(1);
  const [guarantors, setGuarantors] = useState({
    guarantor1: { name: '', phone: '', relationship: '' },
    guarantor2: { name: '', phone: '', relationship: '' },
  });

  const handleChange = (key, field, value) => {
    setGuarantors(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    const fullForm = {
      ...route.params, // Previous form data from personal info and KYC
      guarantors,
    };
    navigation.navigate('ReviewAndSubmit', fullForm);
  };

  const current = step === 1 ? 'guarantor1' : 'guarantor2';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.stepText}>Step {step + 1} of 3</Text>
      <Text style={styles.title}>Guarantor {step}</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter full name"
        placeholderTextColor="#888"
        value={guarantors[current].name}
        onChangeText={(text) => handleChange(current, 'name', text)}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        value={guarantors[current].phone}
        onChangeText={(text) => handleChange(current, 'phone', text)}
      />

      <Text style={styles.label}>Relationship</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Friend, Cousin"
        placeholderTextColor="#888"
        value={guarantors[current].relationship}
        onChangeText={(text) => handleChange(current, 'relationship', text)}
      />

      <View style={styles.navButtons}>
        {step === 2 && (
          <TouchableOpacity style={styles.backButton} onPress={prevStep}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        )}

        {step === 1 ? (
          <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
            <Text style={styles.nextText}>Submit Application</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#F8F5FF',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  nextButton: {
    backgroundColor: '#6A0DAD',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  nextText: {
    color: '#fff',
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#eee',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  backText: {
    color: '#333',
    fontWeight: '600',
  },
  stepText: {
    color: '#6A0DAD',
    marginBottom: 10,
    fontWeight: '600',
  },
});

export default GuarantorFormScreen;
