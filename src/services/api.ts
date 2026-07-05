// src/services/api.ts
import axios from 'axios';

// ⚠️ QUAN TRỌNG: iOS Simulator không dùng được "localhost"
// Phải dùng IP thật của máy Mac
// Mở Terminal → gõ: ipconfig getifaddr en0 → copy IP đó vào đây
const BASE_URL = 'http://192.168.1.15:5000/api';
// Ví dụ: 'http://192.168.1.5:5000/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // timeout sau 10 giây
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;