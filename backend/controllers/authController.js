// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ===== ĐĂNG KÝ =====
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email này đã được đăng ký' });
    }

    // 2. Mã hóa mật khẩu (KHÔNG bao giờ lưu mật khẩu thô)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Tạo user mới trong MongoDB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 4. Tạo JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // token hết hạn sau 7 ngày
    );

    // 5. Trả về thông tin (KHÔNG trả password)
    res.status(201).json({
      message: 'Đăng ký thành công',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// ===== ĐĂNG NHẬP =====
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Tìm user theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email không tồn tại' });
    }

    // 2. So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mật khẩu không đúng' });
    }

    // 3. Tạo JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Đăng nhập thành công',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};