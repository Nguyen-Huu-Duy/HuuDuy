// src/screens/Auth/Register/Styles.ts
// Dùng lại y hệt Styles của Login — chỉ thêm 1 style mới
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: { fontSize: 48, marginBottom: 12 },
  title: {
    fontSize: 26, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 6,
  },
  subtitle: { fontSize: 15, color: '#888' },
  form: { gap: 14 },
  inputGroup: { gap: 6 },
  label: { fontSize: 14, fontWeight: '600', color: '#333' },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: '#E0E0E0',
    borderRadius: 12, paddingHorizontal: 16,
    backgroundColor: '#FAFAFA', height: 52,
  },
  inputWrapperFocused: { borderColor: '#FF6B35', backgroundColor: '#FFF8F5' },
  inputWrapperError: { borderColor: '#FF3B30' },
  inputIcon: { fontSize: 18, marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: '#1A1A1A' },
  eyeButton: { padding: 4 },
  eyeIcon: { fontSize: 18 },
  errorText: { fontSize: 12, color: '#FF3B30', marginTop: 2 },
  registerButton: {
    backgroundColor: '#FF6B35', borderRadius: 12,
    height: 52, justifyContent: 'center', alignItems: 'center',
    marginTop: 8, shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  registerButtonDisabled: { backgroundColor: '#FFB89A', shadowOpacity: 0 },
  registerButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  divider: {
    flexDirection: 'row', alignItems: 'center',
    marginVertical: 20, gap: 12,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E8E8E8' },
  dividerText: { fontSize: 13, color: '#AAA' },
  loginRow: {
    flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center', gap: 4,
  },
  loginText: { fontSize: 14, color: '#666' },
  loginLink: { fontSize: 14, color: '#FF6B35', fontWeight: 'bold' },
  // Thêm cho terms
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 4 },
  checkbox: {
    width: 20, height: 20, borderRadius: 4,
    borderWidth: 2, borderColor: '#FF6B35',
    justifyContent: 'center', alignItems: 'center',
  },
  checkboxChecked: { backgroundColor: '#FF6B35' },
  checkmark: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  termsText: { flex: 1, fontSize: 13, color: '#666', lineHeight: 20 },
  termsLink: { color: '#FF6B35', fontWeight: '600' },
});