// src/models/User.js
// Model cho bảng Users (Ứng viên & Nhà tuyển dụng)

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    // Thông tin cá nhân
    fullName: {
      type: String,
      required: [true, 'Vui lòng nhập tên'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Vui lòng nhập email'],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email không hợp lệ'],
    },
    password: {
      type: String,
      required: [true, 'Vui lòng nhập mật khẩu'],
      minlength: 6,
      select: false, // Không trả về password mặc định
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default: null,
    },

    // Phân loại user
    role: {
      type: String,
      enum: ['candidate', 'employer', 'admin'],
      default: 'candidate',
    },

    // Thông tin ứng viên
    candidate: {
      bio: String,
      skills: [String], // Danh sách kỹ năng
      experience: String, // Năm kinh nghiệm
      education: String,
      cvFile: String, // URL file CV
      desiredSalary: {
        min: Number,
        max: Number,
        currency: { type: String, default: 'VND' },
      },
      preferredLocations: [String], // Địa điểm công việc mong muốn
      jobTypes: [
        {
          type: String,
          enum: ['full-time', 'part-time', 'remote', 'contract'],
        },
      ],
      savedJobs: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Job',
        },
      ],
    },

    // Thông tin nhà tuyển dụng
    employer: {
      companyName: String,
      industry: String,
      companyWebsite: String,
      companyLogo: String,
      companySize: {
        type: String,
        enum: ['startup', 'small', 'medium', 'large', 'enterprise'],
      },
      description: String,
      companyAddress: String,
    },

    // Trạng thái
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware: Hash password trước khi lưu
userSchema.pre('save', async function (next) {
  // Chỉ hash password nếu có thay đổi
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method: So sánh password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
