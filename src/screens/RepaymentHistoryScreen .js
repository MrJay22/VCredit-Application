import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import api from '../api/client';

const RepaymentHistoryScreen = ({ navigation }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await api.get('/api/loan/repayment-history');
      setHistory(res.data.history);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('RepaymentDetail', { repaymentId: item._id })}
      style={{ padding: 16, borderBottomWidth: 1, borderColor: '#ccc' }}
    >
      <Text style={{ fontWeight: 'bold' }}>₦{item.amount.toLocaleString()}</Text>
      <Text>{item.method === 'manual' ? 'Manual Payment' : 'Auto-Debit'}</Text>
      <Text style={{ color: '#666' }}>{new Date(item.createdAt).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : history.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 50 }}>No repayment history yet</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default RepaymentHistoryScreen;
