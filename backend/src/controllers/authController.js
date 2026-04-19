// src/controllers/authController.js
// Controller xử lý Authentication

import User from '../models/User.js';
import { sendTokenResponse, generateToken } from '../utils/jwt.js';

/**
 * @route   POST /api/auth/register
 * @desc    Đăng ký user mới
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Kiểm tra dữ liệu bắt buộc
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập tên, email và mật khẩu',
      });
    }

    // Kiểm tra user đã tồn tại
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'Email này đã được đăng ký',
      });
    }

    // Tạo user mới
    user = await User.create({
      fullName,
      email,
      password,
      role: role || 'candidate',
    });

    // Trả về response với token
    sendTokenResponse(user, 201, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Đăng nhập user
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra dữ liệu bắt buộc
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập email và mật khẩu',
      });
    }

    // Tìm user và kiểm tra password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không chính xác',
      });
    }

    // So sánh password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không chính xác',
      });
    }

    // Trả về response với token
    sendTokenResponse(user, 200, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   GET /api/auth/me
 * @desc    Lấy thông tin user hiện tại
 * @access  Private
 */
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy user',
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   PUT /api/auth/update-profile
 * @desc    Cập nhật profile user
 * @access  Private
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { fullName, phone, address, avatar } = req.body;

    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy user',
      });
    }

    // Cập nhật thông tin cơ bản
    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (avatar) user.avatar = avatar;

    // Cập nhật thông tin theo role
    if (req.body.candidate && user.role === 'candidate') {
      user.candidate = {
        ...user.candidate,
        ...req.body.candidate,
      };
    }

    if (req.body.employer && user.role === 'employer') {
      user.employer = {
        ...user.employer,
        ...req.body.employer,
      };
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Cập nhật profile thành công',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
