// src/screens/Auth/Register/index.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { styles } from './Styles';
import { registerAPI } from '../../../services/authService';
import { useAuth } from '../../../context/AuthContext';

export default function Register({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreed: '',
  });

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    password: false,
    confirm: false,
  });

  const { login } = useAuth();

  const validate = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreed: '',
    };
    let valid = true;

    if (!name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email không đúng định dạng';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Mật khẩu ít nhất 6 ký tự';
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
      valid = false;
    }

    if (!agreed) {
      newErrors.agreed = 'Vui lòng đồng ý điều khoản';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const data = await registerAPI(name, email, password);
      await login(data.user, data.token);
      navigation.replace('Home');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Lỗi kết nối. Thử lại sau.';
      Alert.alert('Đăng ký thất bại', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.header}>
          <Text style={styles.logo}>👋</Text>
          <Text style={styles.title}>Tạo tài khoản mới</Text>
          <Text style={styles.subtitle}>Điền thông tin để bắt đầu</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Họ và tên</Text>
            <View style={[
              styles.inputWrapper,
              focused.name && styles.inputWrapperFocused,
              errors.name ? styles.inputWrapperError : null,
            ]}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput
                style={styles.input}
                placeholder="Nguyễn Văn A"
                placeholderTextColor="#BBB"
                value={name}
                onChangeText={setName}
                onFocus={() => setFocused(prev => ({ ...prev, name: true }))}
                onBlur={() => setFocused(prev => ({ ...prev, name: false }))}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {errors.name ? <Text style={styles.errorText}>⚠ {errors.name}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={[
              styles.inputWrapper,
              focused.email && styles.inputWrapperFocused,
              errors.email ? styles.inputWrapperError : null,
            ]}>
              <Text style={styles.inputIcon}>📧</Text>
              <TextInput
                style={styles.input}
                placeholder="email@example.com"
                placeholderTextColor="#BBB"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocused(prev => ({ ...prev, email: true }))}
                onBlur={() => setFocused(prev => ({ ...prev, email: false }))}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {errors.email ? <Text style={styles.errorText}>⚠ {errors.email}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mật khẩu</Text>
            <View style={[
              styles.inputWrapper,
              focused.password && styles.inputWrapperFocused,
              errors.password ? styles.inputWrapperError : null,
            ]}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="Ít nhất 6 ký tự"
                placeholderTextColor="#BBB"
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocused(prev => ({ ...prev, password: true }))}
                onBlur={() => setFocused(prev => ({ ...prev, password: false }))}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(prev => !prev)}
              >
                <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
            {errors.password ? <Text style={styles.errorText}>⚠ {errors.password}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Xác nhận mật khẩu</Text>
            <View style={[
              styles.inputWrapper,
              focused.confirm && styles.inputWrapperFocused,
              errors.confirmPassword ? styles.inputWrapperError : null,
            ]}>
              <Text style={styles.inputIcon}>🔐</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập lại mật khẩu"
                placeholderTextColor="#BBB"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onFocus={() => setFocused(prev => ({ ...prev, confirm: true }))}
                onBlur={() => setFocused(prev => ({ ...prev, confirm: false }))}
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirm(prev => !prev)}
              >
                <Text style={styles.eyeIcon}>{showConfirm ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
            {errors.confirmPassword ? <Text style={styles.errorText}>⚠ {errors.confirmPassword}</Text> : null}
          </View>

          <TouchableOpacity
            style={styles.termsRow}
            onPress={() => setAgreed(prev => !prev)}
          >
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.termsText}>
              Tôi đồng ý với{' '}
              <Text style={styles.termsLink}>Điều khoản sử dụng</Text>
              {' '}và{' '}
              <Text style={styles.termsLink}>Chính sách bảo mật</Text>
            </Text>
          </TouchableOpacity>
          {errors.agreed ? <Text style={styles.errorText}>⚠ {errors.agreed}</Text> : null}

          <TouchableOpacity
            style={[styles.registerButton, loading && styles.registerButtonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.registerButtonText}>
              {loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>hoặc</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Đã có tài khoản?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
