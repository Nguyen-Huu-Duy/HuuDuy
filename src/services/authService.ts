// src/services/authService.ts
import api from './api';

// Đăng nhập
export const loginAPI = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
  // trả về: { message, token, user: { id, name, email, role } }
};

// Đăng ký
export const registerAPI = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data;
};