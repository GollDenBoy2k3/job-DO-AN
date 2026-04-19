// src/middleware/errorHandler.js
// Middleware xử lý lỗi toàn cục

/**
 * Middleware xử lý lỗi
 * @param {Error} err - Error object
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 */
export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Lỗi Mongoose validation
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      message: messages.join(', '),
    });
  }

  // Lỗi Mongoose duplicate key
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Giá trị này đã tồn tại',
    });
  }

  // Lỗi mặc định
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Lỗi máy chủ',
  });
};
