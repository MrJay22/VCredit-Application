import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/client';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('userToken').then(storedToken => {
      if (storedToken) {
        api.get('/me', {
          headers: { Authorization: `Bearer ${storedToken}` }
        })
          .then(res => {
            setUser({ ...res.data, token: storedToken });
            setToken(storedToken);
          })
          .catch(() => {
            AsyncStorage.removeItem('userToken');
            setUser(null);
          });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  const signIn = async (phone, password) => {
    try {
      const { data } = await api.post('/auth/login', { phone, password });

      await AsyncStorage.setItem('userToken', data.token);
      setToken(data.token);

      const res = await api.get('/me', {
        headers: { Authorization: `Bearer ${data.token}` }
      });

      setUser({ ...res.data, token: data.token });
    } catch (err) {
      console.error('❌ Login failed:', err.response?.data || err.message);
      throw err;
    }
  };

  const signUp = async (details) => {
    try {
      const { data } = await api.post('/auth/register', details);
      return data;
    } catch (err) {
      console.error('❌ Signup failed:', err.response?.data || err.message);
      throw err;
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
