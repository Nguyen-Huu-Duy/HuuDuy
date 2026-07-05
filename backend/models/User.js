const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng nhập tên'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Vui lòng nhập email'],
      unique: true,  // không cho phép 2 người cùng email
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Vui lòng nhập mật khẩu'],
      minlength: 6,
    },
    phone: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['customer', 'tasker', 'admin'], // chỉ 3 giá trị này
      default: 'customer',
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // tự thêm createdAt và updatedAt
  }
);

module.exports = mongoose.model('User', UserSchema);