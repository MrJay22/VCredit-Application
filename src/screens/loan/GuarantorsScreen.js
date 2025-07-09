import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const GuarantorsScreen = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);

  const { nin, occupation, bankName, accountNumber, accountName, dob, address, photo, idImage } = route.params;

  const [step, setStep] = useState(1);
  const [guarantors, setGuarantors] = useState({
    guarantor1: { name: '', phone: '', relationship: '' },
    guarantor2: { name: '', phone: '', relationship: '' },
    emergencyContact: { name: '', phone: '', relationship: '' },
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
    navigation.navigate('ReviewAndSubmitScreen', {
      name: user.name,
      phone: user.phone,
      nin,
      occupation,
      bankName,
      accountNumber,
      accountName,
      dob,
      address,
      photo,
      idImage,
      guarantors,
    });
  };

  const stepKeys = ['guarantor1', 'guarantor2', 'emergencyContact'];
  const currentKey = stepKeys[step - 1];
  const isFinalStep = step === 3;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Guarantor Details</Text>
      <Text style={styles.stepText}>Step {step} of 3</Text>
      <Text style={styles.title}>
        {step === 3 ? 'Emergency Contact' : `Guarantor ${step}`}
      </Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter full name"
        value={guarantors[currentKey].name}
        onChangeText={(text) => handleChange(currentKey, 'name', text)}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={guarantors[currentKey].phone}
        onChangeText={(text) => handleChange(currentKey, 'phone', text)}
      />

      <Text style={styles.label}>Relationship</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Friend, Cousin"
        value={guarantors[currentKey].relationship}
        onChangeText={(text) => handleChange(currentKey, 'relationship', text)}
      />

      <View style={styles.navButtons}>
        {step > 1 && (
          <TouchableOpacity style={styles.backButton} onPress={prevStep}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        )}

        {isFinalStep ? (
          <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
            <Text style={styles.nextText}>Submit Application</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#F8F5FF',
    flexGrow: 1,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6A0DAD',
    textAlign: 'center',
    marginBottom: 16,
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

export default GuarantorsScreen;
