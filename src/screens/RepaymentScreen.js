import React, { useState, useContext, useCallback } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList,
  Alert, ActivityIndicator, RefreshControl
} from 'react-native';
import api from '../api/client';
import colors from '../theme/colors';
import { AuthContext } from '../context/AuthContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Ionicons } from '@expo/vector-icons';

const formatNaira = (val) => typeof val === 'number' ? `₦${val.toLocaleString()}` : '₦0';

const RepaymentScreen = () => {
  const { user, setHasCompletedForm } = useContext(AuthContext);
  const [loan, setLoan] = useState(null);
  const [repayments, setRepayments] = useState([]);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedRepayment, setSelectedRepayment] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const navigation = useNavigation();

  const [loanStatus, setLoanStatus] = useState(null);
  const [currentLoan, setCurrentLoan] = useState(null);

  const fetchLoanData = async () => {
    try {
      const res = await api.get('/api/loan/repayment-info', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setLoan(res.data.loan || null);
      setRepayments(res.data.repayments || []);
    } catch (err) {
      console.error('Loan fetch error:', err);
      Alert.alert('Error', 'Could not load loan info');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchLoanStatus = async () => {
    try {
      const res = await api.get('/api/loan/loan-status', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setHasCompletedForm?.(res.data.hasCompletedForm);
      setLoanStatus(res.data.status);
      setCurrentLoan(res.data.loan || null);
    } catch (err) {
      console.error('Loan status fetch error:', err);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLoanData();
    await fetchLoanStatus();
  };

  useFocusEffect(
    useCallback(() => {
      fetchLoanData();
      fetchLoanStatus();
    }, [])
  );

  const handleRepay = async () => {
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) return Alert.alert('Invalid', 'Enter a valid amount.');
    try {
      await api.post(
        '/api/loan/repay',
        { amount: numAmount },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setAmount('');
      Alert.alert('Success', `${formatNaira(numAmount)} repaid.`);
      await fetchLoanData();
    } catch (err) {
      console.error('Repay failed:', err);
      Alert.alert('Error', err?.response?.data?.error || 'Repayment failed.');
    }
  };

  const downloadReceipt = async () => {
    const r = selectedRepayment;
    const html = `
      <h2>Repayment Receipt</h2>
      <p><strong>Amount:</strong> ₦${Number(r.amount || 0).toLocaleString()}</p>
      <p><strong>Method:</strong> ${r.method}</p>
      <p><strong>Status:</strong> ${r.status}</p>
      <p><strong>Date:</strong> ${new Date(r.createdAt).toLocaleString()}</p>
      <p><strong>Loan ID:</strong> ${r.loanId}</p>
      <p>Thank you for repaying your loan.</p>
    `;
    try {
      const file = await RNHTMLtoPDF.convert({
        html,
        fileName: `RepaymentReceipt_${r._id}`,
        directory: 'Documents',
      });
      Alert.alert('Downloaded', `Receipt saved to:\n${file.filePath}`);
    } catch (error) {
      console.error('PDF error:', error);
      Alert.alert('Error', 'Could not generate receipt.');
    }
  };

  const renderLoanCard = () => {
    if (!loan) return null;

    const statusColor =
      loan.status === 'cleared' ? '#4CAF50' :
      loan.status === 'pending' ? '#FFC107' :
      loan.status === 'declined' ? 'red' :
      loan.status === 'overdue' ? 'red' :
      colors.purple;

    const totalDue = loan.amount + loan.interest + (loan.overdueInterest || 0);
    const dueIn =
      loan.overdueDays > 0
        ? `${loan.overdueDays} day(s) overdue`
        : `${loan.overdueDays} day(s) to due`;

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Loan Summary</Text>
        <Text style={[styles.statusText, { color: statusColor }]}>
          Status: {loan.status.toUpperCase()}
        </Text>

        {loan.status === 'declined' && currentLoan?.declineReason && (
          <View style={styles.declineBox}>
            <Text style={styles.declineTitle}>Loan Declined</Text>
            <Text style={styles.declineReason}>{currentLoan.declineReason}</Text>
          </View>
        )}

        <Text style={styles.amount}>{formatNaira(totalDue)}</Text>
        <Text style={styles.info}>Principal: {formatNaira(loan.amount)}</Text>
        <Text style={styles.info}>Interest: {formatNaira(loan.interest)}</Text>
        <Text style={styles.info}>Overdue Interest: {formatNaira(loan.overdueInterest)}</Text>
        <Text style={styles.info}>Due Date: {new Date(loan.dueDate).toDateString()}</Text>
        <Text style={styles.info}>Due Status: {dueIn}</Text>

        {(loan.status === 'running' || loan.status === 'overdue') && (
          <TouchableOpacity style={styles.repayBtn} onPress={() => navigation.navigate('WalletScreen')}>
            <Text style={styles.repayBtnText}>Repay Now</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderRepaymentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => {
        setSelectedRepayment(item);
        setShowDetail(true);
      }}
    >
      <View>
        <Text style={styles.historyAmount}>{formatNaira(item.amount)}</Text>
        <Text style={{ fontSize: 13, color: '#888' }}>
          {item.method === 'auto-debit' ? 'Auto-debit' : 'Manual'}
        </Text>
      </View>
      <Text style={styles.historyDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}></Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.purple} />
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              {renderLoanCard()}
              <Text style={styles.historyTitle}>Repayment History</Text>
            </>
          }
          data={repayments}
          keyExtractor={(item) => item._id}
          renderItem={renderRepaymentItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={<Text style={styles.emptyText}>No repayment yet.</Text>}
        />
      )}

      {showDetail && selectedRepayment && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Repayment Detail</Text>
            <Text>Amount: {formatNaira(selectedRepayment.amount)}</Text>
            <Text>Method: {selectedRepayment.method}</Text>
            <Text>Status: {selectedRepayment.status}</Text>
            <Text>Loan ID: {selectedRepayment.loanId}</Text>
            <Text>Date: {new Date(selectedRepayment.createdAt).toLocaleString()}</Text>

            <TouchableOpacity onPress={downloadReceipt} style={styles.pdfBtn}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Download Receipt</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowDetail(false)} style={styles.closeBtn}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 20 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  backButton: {
    padding: 6,
    marginRight: 10,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 30,
    elevation: 4,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#555', marginBottom: 6 },
  statusText: { fontWeight: 'bold', marginBottom: 10 },
  amount: { fontSize: 24, fontWeight: 'bold', color: colors.purple, marginBottom: 6 },
  info: { fontSize: 14, color: '#666' },
  repayBtn: {
    backgroundColor: colors.purple,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 16,
    alignItems: 'center',
  },
  repayBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  historyTitle: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 12 },
  historyItem: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  historyAmount: { fontWeight: '600', color: colors.purple },
  historyDate: { color: '#666' },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontStyle: 'italic',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 100,
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    width: '100%',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  pdfBtn: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  closeBtn: {
    backgroundColor: colors.purple,
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  declineBox: {
    backgroundColor: '#ffe6e6',
    padding: 14,
    borderRadius: 12,
    marginVertical: 10,
  },
  declineTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#c30010',
    marginBottom: 6,
  },
  declineReason: {
    fontSize: 14,
    color: '#a30000',
  },
});

export default RepaymentScreen;
