import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../api/client';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const ApplyNowScreen = () => {
  const navigation = useNavigation();
  const { token } = useContext(AuthContext);

  const [amount, setAmount] = useState('');
  const [animation] = useState(new Animated.Value(0));
  const [eligibleAmount, setEligibleAmount] = useState(null);
  const [minAmount, setMinAmount] = useState(1000);
  const [notice, setNotice] = useState('');
  const [overdueCharge, setOverdueCharge] = useState(null);
  const [terms, setTerms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewData, setPreviewData] = useState(null);
  const [previewing, setPreviewing] = useState(false);

  useEffect(() => {
    fetchLoanSettings();
  }, []);

  const fetchLoanSettings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/loan/settings', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const repaymentTerms = Array.isArray(res.data.repaymentTerms) ? res.data.repaymentTerms : [];

      setEligibleAmount(res.data.eligibleAmount);
      setMinAmount(res.data.minAmount || 1000);
      setNotice(res.data.notice || '');
      setOverdueCharge(res.data.overdueCharge);
      setTerms(repaymentTerms);
      setSelectedTerm(repaymentTerms[0] || null);
    } catch (err) {
      console.error('Loan settings fetch error:', err);
      Alert.alert('Error', 'Failed to load loan settings');
    } finally {
      setLoading(false);
    }
  };

  const numericAmount = parseInt(amount);
  const isValidAmount = numericAmount >= minAmount && numericAmount <= eligibleAmount;

  const animateIn = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handleChange = (text) => {
    setAmount(text);
    setPreviewData(null);
    animateIn();
  };

  const handlePreview = async () => {
    if (!isValidAmount || !selectedTerm) {
      Alert.alert('Invalid Input', 'Enter valid amount and choose a repayment term');
      return;
    }

    try {
      setPreviewing(true);
      const res = await api.post(
        '/api/loan/preview',
        { amount: numericAmount, days: selectedTerm.days },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPreviewData(res.data);
    } catch (err) {
      console.error('Loan preview error:', err);
      const msg = err.response?.data?.message || 'Preview failed. Try again.';
      Alert.alert('Error', msg);
    } finally {
      setPreviewing(false);
    }
  };

  const handleSubmit = async () => {
    if (!previewData || !selectedTerm) return;

    try {
      const res = await api.post(
        '/api/loan/initiate',
        {
          amount: numericAmount,
          interest: previewData.interest,
          totalRepayment: previewData.totalRepayment,
          dueDate: new Date(previewData.dueDate).toISOString(),
          days: selectedTerm.days,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigation.navigate('LoanConfirmScreen', { loan: res.data.loan });
    } catch (err) {
      console.error('Loan apply error:', err);
      const msg = err?.response?.data?.message || 'Loan request failed. Try again.';
      Alert.alert('Error', msg);
    }
  };

  const TermCard = ({ term }) => (
    <TouchableOpacity
      key={term.days}
      style={[styles.termCard, selectedTerm?.days === term.days && styles.termCardSelected]}
      onPress={() => {
        setSelectedTerm(term);
        setPreviewData(null);
      }}
    >
      <Text style={[styles.termText, selectedTerm?.days === term.days && { color: '#fff' }]}>
        {term.days} Days
      </Text>
    </TouchableOpacity>
  );

  if (loading || eligibleAmount === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5E17EB" />
        <Text style={{ marginTop: 10, color: '#555' }}>Loading settings...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f4fd' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.shapeBg} />

          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.screenTitle}>Apply for Loan</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.headerRow}>
              <Text style={styles.label}>Your Eligible Loan:</Text>
              <TouchableOpacity onPress={fetchLoanSettings}>
                <Ionicons name="refresh" size={20} color="#5E17EB" style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            </View>
            <Text style={styles.eligibleAmount}>₦{eligibleAmount.toLocaleString()}</Text>
            <Text style={styles.orText}>Maintain good record to increase limit</Text>
          </View>

          <Text style={styles.label}>Choose Repayment Term</Text>
          <View style={styles.termRow}>
            {terms.map((term) => (
              <TermCard key={term.days} term={term} />
            ))}
          </View>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder={`Enter amount (₦${minAmount} - ₦${eligibleAmount})`}
            value={amount}
            onChangeText={handleChange}
          />

          {numericAmount > eligibleAmount && (
            <Text style={styles.warningText}>
              Amount exceeds your eligible limit of ₦{eligibleAmount.toLocaleString()}
            </Text>
          )}

          <TouchableOpacity
            style={[styles.button, !isValidAmount && styles.buttonDisabled]}
            onPress={handlePreview}
            disabled={!isValidAmount}
          >
            <Text style={styles.buttonText}>{previewing ? 'Previewing...' : 'Preview Loan'}</Text>
          </TouchableOpacity>

          {previewData && (
            <Animated.View style={[styles.resultCard, { opacity: animation }]}>
              <Text style={styles.resultText}>Interest: ₦{previewData.interest.toLocaleString()}</Text>
              <Text style={styles.resultText}>Total Repayment: ₦{previewData.totalRepayment.toLocaleString()}</Text>
              <Text style={styles.resultText}>Due Date: {previewData.dueDate}</Text>
              <Text style={styles.resultText}>Overdue Charge: {previewData.overdueCharge}</Text>
            </Animated.View>
          )}

          <Text style={styles.notice}>{notice}</Text>

          {previewData && (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Take Loan</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  shapeBg: {
    position: 'absolute',
    width: '200%',
    height: 300,
    backgroundColor: '#d1b3ff',
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    top: -100,
    left: '-50%',
    zIndex: -1,
  },
  topBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backButton: { padding: 6, marginRight: 10 },
  screenTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  label: { fontSize: 16, color: '#333', marginBottom: 8 },
  eligibleAmount: { fontSize: 32, fontWeight: 'bold', color: '#5E17EB', marginVertical: 8 },
  orText: { fontSize: 14, color: '#666' },
  warningText: { color: '#d00000', fontSize: 14, marginBottom: 10, fontWeight: '500' },
  termRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  termCard: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  termCardSelected: {
    backgroundColor: '#5E17EB',
  },
  termText: {
    fontWeight: '600',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  resultCard: {
    backgroundColor: '#eae2ff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  button: {
    backgroundColor: '#5E17EB',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  notice: {
    backgroundColor: '#f0e6ff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    color: '#6A0DAD',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default ApplyNowScreen;
