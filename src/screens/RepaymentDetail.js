import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import api from '../api/client';

const RepaymentDetail = ({ route }) => {
  const { repaymentId } = route.params;
  const [repayment, setRepayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/api/loan/repayment/${repaymentId}`);
        setRepayment(res.data.repayment);
      } catch (err) {
        console.error('Error fetching repayment:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  if (!repayment) return <Text style={{ textAlign: 'center' }}>Not found</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Repayment Details</Text>
      <Text>Amount: ₦{repayment.amount.toLocaleString()}</Text>
      <Text>Method: {repayment.method}</Text>
      <Text>Status: {repayment.status}</Text>
      <Text>Date: {new Date(repayment.createdAt).toLocaleString()}</Text>
    </View>
  );
};

export default RepaymentDetail;
