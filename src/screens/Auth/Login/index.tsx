// src/screens/Auth/Login/index.tsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { loginAPI } from '../../../services/authService';
import { useAuth } from '../../../context/AuthContext';
import { styles } from './Styles';

export default function Login({ navigation }: any) {
  // State lưu giá trị input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State UI
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  // State lỗi validation
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { login } = useAuth(); // Lấy hàm login từ AuthContext

  // Kiểm tra form trước khi gửi
  const validate = () => {
    let valid = true;

    if (!email.trim()) {
      setEmailError('Vui lòng nhập email');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email không đúng định dạng');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Mật khẩu ít nhất 6 ký tự');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

const handleLogin = async () => {
  if (!validate()) return;

  setLoading(true);
  try {
    // Gọi API backend
    const data = await loginAPI(email, password);

    // Lưu token + user vào AuthContext + AsyncStorage
    await login(data.user, data.token);

    // Chuyển sang Home (sẽ tạo ở Ngày 6)
    navigation.replace('Home');

  } catch (error: any) {
    // Xử lý lỗi từ server
    const message =
      error.response?.data?.message || 'Lỗi kết nối. Thử lại sau.';
    Alert.alert('Đăng nhập thất bại', message);
  } finally {
    setLoading(false);
  }
};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>🏠</Text>
          <Text style={styles.title}>Chào mừng trở lại</Text>
          <Text style={styles.subtitle}>Đăng nhập để tiếp tục</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>

          {/* Input Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={[
              styles.inputWrapper,
              emailFocused && styles.inputWrapperFocused,
              emailError ? styles.inputWrapperError : null,
            ]}>
              <Text style={styles.inputIcon}>📧</Text>
              <TextInput
                style={styles.input}
                placeholder="email@example.com"
                placeholderTextColor="#BBB"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {emailError ? <Text style={styles.errorText}>⚠ {emailError}</Text> : null}
          </View>

          {/* Input Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mật khẩu</Text>
            <View style={[
              styles.inputWrapper,
              passwordFocused && styles.inputWrapperFocused,
              passwordError ? styles.inputWrapperError : null,
            ]}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu"
                placeholderTextColor="#BBB"
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeIcon}>
                  {showPassword ? '🙈' : '👁️'}
                </Text>
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>⚠ {passwordError}</Text> : null}
          </View>

          {/* Quên mật khẩu */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotText}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          {/* Nút đăng nhập */}
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>hoặc</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Link sang Register */}
          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Chưa có tài khoản?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Đăng ký ngay</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}