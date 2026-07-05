// src/screens/Home/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function Home({ navigation }: any) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc muốn đăng xuất không?',
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Đăng xuất',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🏠</Text>
      <Text style={styles.welcome}>Xin chào, {user?.name}! 👋</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Text style={styles.role}>Role: {user?.role}</Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          ✅ Đăng nhập thành công!{'\n'}
          Tuần 3 sẽ xây dựng{'\n'}
          Home thật với danh sách dịch vụ.
        </Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center',
    alignItems: 'center', backgroundColor: '#F8F9FA',
    paddingHorizontal: 24,
  },
  logo: { fontSize: 64, marginBottom: 16 },
  welcome: {
    fontSize: 22, fontWeight: 'bold',
    color: '#1A1A1A', marginBottom: 4,
  },
  email: { fontSize: 14, color: '#888', marginBottom: 4 },
  role: {
    fontSize: 13, color: '#FF6B35',
    fontWeight: '600', marginBottom: 32,
  },
  card: {
    backgroundColor: '#FFF', borderRadius: 16,
    padding: 24, width: '100%',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8,
    elevation: 3, marginBottom: 32,
  },
  cardText: {
    fontSize: 15, color: '#444',
    textAlign: 'center', lineHeight: 24,
  },
  logoutButton: {
    borderWidth: 1.5, borderColor: '#FF3B30',
    borderRadius: 12, paddingVertical: 12,
    paddingHorizontal: 32,
  },
  logoutText: {
    color: '#FF3B30', fontSize: 15, fontWeight: '600',
  },
});