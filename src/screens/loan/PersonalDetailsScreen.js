import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../../context/AuthContext';

export default function PersonalDetailsScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [nin, setNin] = useState('');
  const [bankName, setbankName] = useState('');
  const [accountNumber, setaccountNumber] = useState('');
  const [accountName, setaccountName] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCameraLaunch = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      return Alert.alert('Permission Denied', 'Camera access is needed');
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
      cameraType: 'front',
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri); // ✅ FIXED: correct way to get URI
    }
  };

  const handleNext = () => {
    if (nin.length !== 11) {
      return Alert.alert('Invalid NIN', 'NIN must be exactly 11 digits.');
    }
    if (!dob || !address || !photo || !bankName || !accountNumber || !accountName) {
      return Alert.alert('Incomplete Form', 'Please complete all fields.');
    }

    navigation.navigate('GuarantorsScreen', {
      nin,
      bankName,
      accountNumber,
      accountName,
      dob,
      address,
      photo,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.heading}>Complete Your Details</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} value={user?.name || ''} editable={false} />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={user?.phone || ''} editable={false} />

        <Text style={styles.label}>NIN   *Loan Auto Disqualify if Invalid</Text>
        <TextInput
          style={styles.input}
          value={nin}
          onChangeText={setNin}
          keyboardType="numeric"
          maxLength={11}
        />

        <Text style={styles.label}>Bank Name</Text>
        <TextInput style={styles.input} value={bankName} onChangeText={setbankName} />

        <Text style={styles.label}>Account Number</Text>
        <TextInput style={styles.input} value={accountNumber} onChangeText={setaccountNumber} keyboardType="numeric" maxLength={10} />
        
        <Text style={styles.label}>Account Name</Text>
        <TextInput style={styles.input} value={accountName} onChangeText={setaccountName} />

        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity
          style={[styles.input, { justifyContent: 'center' }]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: dob ? '#000' : '#aaa' }}>
            {dob || 'Select Date of Birth'}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            value={new Date()}
            display="default"
            maximumDate={new Date()}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                const formatted = selectedDate.toISOString().split('T')[0];
                setDob(formatted);
              }
            }}
          />
        )}

        <Text style={styles.label}>Home Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />

        <TouchableOpacity style={styles.photoBtn} onPress={handleCameraLaunch}>
          <Text style={styles.photoBtnText}>
            {photo ? 'Retake Photo' : 'Take Live Photo'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5FF',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 30,
    color: '#6A0DAD',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    marginTop: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
  },
  photoBtn: {
    marginTop: 20,
    backgroundColor: '#6A0DAD',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  photoBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  nextBtn: {
    marginTop: 30,
    backgroundColor: '#6A0DAD',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
