// src/models/Application.js
// Model cho bảng Applications (Đơn ứng tuyển)

import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    // Thông tin ứng tuyển
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Thông tin từ ứng viên
    candidateName: String,
    candidateEmail: String,
    candidatePhone: String,

    // Thông tin công việc (lưu snapshot tại thời điểm apply)
    jobTitle: String,
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    companyName: String,

    // Nội dung đơn
    coverLetter: String, // Thư xin việc
    cvFile: String, // URL file CV (nếu có CV riêng)

    // Trạng thái đơn ứng tuyển
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'accepted', 'rejected', 'interview'],
      default: 'pending',
    },

    // Ghi chú từ nhà tuyển dụng
    notes: String,

    // Ngày phỏng vấn (nếu có)
    interviewDate: Date,
    interviewNotes: String,

    // Boolean flags
    isViewed: {
      type: Boolean,
      default: false,
    },
    isStarred: {
      type: Boolean,
      default: false,
    },

    // Timestamps
    appliedAt: {
      type: Date,
      default: Date.now,
    },
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

// Index để tìm kiếm nhanh
applicationSchema.index({ jobId: 1, candidateId: 1 }, { unique: true }); // Một ứng viên chỉ apply một loại công việc một lần
applicationSchema.index({ employerId: 1 });
applicationSchema.index({ status: 1 });
applicationSchema.index({ appliedAt: -1 });

const Application = mongoose.model('Application', applicationSchema);

export default Application;
