// src/utils/jwt.js
// Utility functions for JWT

import jwt from 'jsonwebtoken';

/**
 * Tạo JWT token
 * @param {string} id - User ID
 * @param {string} expiresIn - Thời gian hết hạn (mặc định 7 ngày)
 * @returns {string} JWT token
 */
export const generateToken = (id, expiresIn = '7d') => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn,
  });
};

/**
 * Xác minh JWT token
 * @param {string} token - JWT token
 * @returns {object} Decoded token
 */
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * Tạo response với token
 * @param {object} user - User object
 * @param {number} statusCode - HTTP status code
 * @param {object} res - Response object
 */
export const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const userResponse = user.toObject();
  delete userResponse.password;

  res.status(statusCode).json({
    success: true,
    token,
    user: userResponse,
  });
};
