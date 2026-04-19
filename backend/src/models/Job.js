// src/models/Job.js
// Model cho bảng Jobs (Công việc)

import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    // Thông tin công việc
    title: {
      type: String,
      required: [true, 'Vui lòng nhập tên công việc'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Vui lòng nhập mô tả công việc'],
    },
    requirements: [String], // Yêu cầu công việc
    responsibilities: [String], // Nhiệm vụ công việc
    category: {
      type: String,
      enum: [
        'IT & Software',
        'Sales & Marketing',
        'Finance',
        'HR',
        'Design',
        'Other',
      ],
      required: true,
    },

    // Mức lương
    salary: {
      min: {
        type: Number,
        required: [true, 'Vui lòng nhập mức lương tối thiểu'],
      },
      max: {
        type: Number,
        required: [true, 'Vui lòng nhập mức lương tối đa'],
      },
      currency: {
        type: String,
        default: 'VND',
      },
      period: {
        type: String,
        enum: ['month', 'year'],
        default: 'month',
      },
    },

    // Loại công việc
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'remote', 'contract'],
      required: true,
    },

    // Vị trí làm việc
    location: {
      type: String,
      required: [true, 'Vui lòng nhập địa điểm làm việc'],
    },

    // Kinh nghiệm yêu cầu
    experienceLevel: {
      type: String,
      enum: ['entry', 'junior', 'mid', 'senior', 'lead'],
      default: 'junior',
    },
    yearsRequired: {
      type: Number,
      default: 0,
    },

    // Kỹ năng yêu cầu
    requiredSkills: [String],

    // Nhà tuyển dụng
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyLogo: String,

    // Trạng thái công việc
    status: {
      type: String,
      enum: ['active', 'closed', 'draft'],
      default: 'draft',
    },
    expiryDate: Date,

    // Số lượng ứng viên
    applicationsCount: {
      type: Number,
      default: 0,
    },
    viewsCount: {
      type: Number,
      default: 0,
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

// Index để tìm kiếm nhanh
jobSchema.index({ title: 'text', description: 'text' });
jobSchema.index({ employerId: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ createdAt: -1 });

const Job = mongoose.model('Job', jobSchema);

export default Job;
