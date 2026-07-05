/*
|--------------------------------------------------------------------------
| db.js - File quản lý kết nối MongoDB
|--------------------------------------------------------------------------
| Nhiệm vụ:
| Chứa duy nhất hàm connectDB() dùng để kết nối ứng dụng tới cơ sở dữ liệu
| MongoDB bằng thư viện Mongoose.
|
| Tại sao tách riêng file này?
| - Giúp code gọn gàng, dễ quản lý.
| - Có thể tái sử dụng ở nhiều nơi nếu cần.
| - Dễ bảo trì và sửa lỗi kết nối Database.
| - Tuân theo cấu trúc dự án Backend chuyên nghiệp.
|
| Luồng hoạt động:
| server.js
|      ↓
| gọi connectDB()
|      ↓
| db.js thực hiện mongoose.connect()
|      ↓
| Kết nối thành công → "MongoDB Connected"
| Kết nối thất bại → In lỗi và dừng chương trình.
|--------------------------------------------------------------------------
*/
// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB kết nối: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Lỗi kết nối MongoDB: ${error.message}`);
    process.exit(1); // thoát app nếu không kết nối được
  }
};

module.exports = connectDB;