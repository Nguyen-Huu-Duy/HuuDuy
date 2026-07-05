/*
|--------------------------------------------------------------------------
| server.js - File khởi động chính của Backend
|--------------------------------------------------------------------------
| Nhiệm vụ:
| 1. Đọc các biến môi trường từ file .env.
| 2. Gọi hàm connectDB() để kết nối tới MongoDB.
| 3. Khởi tạo ứng dụng Express.
| 4. Cấu hình Middleware (cors, express.json,...).
| 5. Khai báo các API/Route.
| 6. Mở cổng (PORT) để server lắng nghe các request từ Frontend.
|
| Luồng hoạt động:
| npm run dev
|      ↓
| server.js chạy
|      ↓
| Kết nối MongoDB
|      ↓
| Khởi tạo Express
|      ↓
| Server sẵn sàng nhận request từ ứng dụng React Native/Web.
|--------------------------------------------------------------------------
*/
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config(); // đọc file .env
connectDB();     // kết nối MongoDB

const app = express();

// Middleware — cho phép app React Native gọi API
app.use(cors());
app.use(express.json()); // đọc được JSON từ request body

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Route test — để kiểm tra server chạy không
app.get('/', (req, res) => {
  res.json({ message: '🚀 HuuDuy Backend đang chạy!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server chạy tại http://localhost:${PORT}`);
});