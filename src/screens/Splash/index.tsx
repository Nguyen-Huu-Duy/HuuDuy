// src/screens/Splash/index.tsx — sửa lại
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function Splash({ navigation }: any) {
  const { user, loading } = useAuth();

  useEffect(() => {
    // Chờ AuthContext kiểm tra token xong
    if (loading) return;

    const timer = setTimeout(() => {
      if (user) {
        // Đã đăng nhập → thẳng vào Home
        navigation.replace('Home');
      } else {
        // Chưa đăng nhập → Onboarding
        navigation.replace('Onboarding');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [loading, user]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🏠</Text>
      <Text style={styles.appName}>HuuDuy</Text>
      <Text style={styles.tagline}>Dịch vụ gia đình tận tâm</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center',
    alignItems: 'center', backgroundColor: '#FF6B35',
  },
  logo: { fontSize: 80, marginBottom: 16 },
  appName: {
    fontSize: 36, fontWeight: 'bold',
    color: '#FFFFFF', marginBottom: 8,
  },
  tagline: { fontSize: 16, color: '#FFE0D0' },
});