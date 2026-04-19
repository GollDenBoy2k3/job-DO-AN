// src/controllers/applicationController.js
// Controller xử lý Đơn ứng tuyển

import Application from '../models/Application.js';
import Job from '../models/Job.js';
import User from '../models/User.js';

/**
 * @route   POST /api/applications
 * @desc    Ứng tuyển công việc (ứng viên gửi đơn)
 * @access  Private (Candidate)
 */
export const applyJob = async (req, res, next) => {
  try {
    const { jobId, coverLetter } = req.body;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng chọn công việc',
      });
    }

    // Tìm công việc
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy công việc',
      });
    }

    // Kiểm tra ứng viên chưa apply công việc này
    const existingApp = await Application.findOne({
      jobId,
      candidateId: req.user._id,
    });

    if (existingApp) {
      return res.status(400).json({
        success: false,
        message: 'Bạn đã ứng tuyển công việc này rồi',
      });
    }

    // Tạo đơn ứng tuyển
    const application = await Application.create({
      jobId,
      candidateId: req.user._id,
      candidateName: req.user.fullName,
      candidateEmail: req.user.email,
      candidatePhone: req.user.phone,
      jobTitle: job.title,
      employerId: job.employerId,
      companyName: job.companyName,
      coverLetter: coverLetter || '',
      cvFile: req.user.candidate?.cvFile || null,
    });

    // Cập nhật số lượng ứng viên
    await Job.findByIdAndUpdate(jobId, { $inc: { applicationsCount: 1 } });

    // Lưu công việc vào ứng viên
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { 'candidate.savedJobs': jobId },
    });

    res.status(201).json({
      success: true,
      message: 'Ứng tuyển thành công',
      data: application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   GET /api/applications
 * @desc    Lấy danh sách đơn ứng tuyển
 * @access  Private
 */
export const getApplications = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const startIndex = (page - 1) * limit;

    let filter = {};

    // Nếu là ứng viên, chỉ lấy đơn của họ
    if (req.user.role === 'candidate') {
      filter.candidateId = req.user._id;
    }

    // Nếu là nhà tuyển dụng, chỉ lấy đơn cho công việc của họ
    if (req.user.role === 'employer') {
      filter.employerId = req.user._id;
    }

    // Filter theo status
    if (status) {
      filter.status = status;
    }

    const applications = await Application.find(filter)
      .populate('jobId', 'title')
      .populate('candidateId', 'fullName email phone')
      .sort({ appliedAt: -1 })
      .limit(parseInt(limit))
      .skip(startIndex);

    const total = await Application.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: applications,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   GET /api/applications/:id
 * @desc    Lấy chi tiết một đơn ứng tuyển
 * @access  Private
 */
export const getApplicationById = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('jobId')
      .populate('candidateId')
      .populate('employerId', 'fullName email');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn ứng tuyển',
      });
    }

    // Kiểm tra quyền
    if (
      application.candidateId._id.toString() !== req.user._id.toString() &&
      application.employerId._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền xem đơn này',
      });
    }

    // Đánh dấu là đã xem (nếu là nhà tuyển dụng)
    if (application.employerId._id.toString() === req.user._id.toString()) {
      application.isViewed = true;
      await application.save();
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   PUT /api/applications/:id
 * @desc    Cập nhật trạng thái đơn ứng tuyển (nhà tuyển dụng)
 * @access  Private (Employer)
 */
export const updateApplication = async (req, res, next) => {
  try {
    const { status, notes, interviewDate } = req.body;

    let application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn ứng tuyển',
      });
    }

    // Kiểm tra quyền (chỉ nhà tuyển dụng)
    if (
      application.employerId.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền cập nhật đơn này',
      });
    }

    // Cập nhật trạng thái
    if (status) {
      application.status = status;
    }

    // Cập nhật ghi chú
    if (notes) {
      application.notes = notes;
    }

    // Cập nhật ngày phỏng vấn
    if (interviewDate) {
      application.interviewDate = interviewDate;
    }

    await application.save();

    res.status(200).json({
      success: true,
      message: 'Cập nhật đơn ứng tuyển thành công',
      data: application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   DELETE /api/applications/:id
 * @desc    Xóa đơn ứng tuyển
 * @access  Private (Candidate hoặc Employer)
 */
export const deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn ứng tuyển',
      });
    }

    // Kiểm tra quyền
    if (
      application.candidateId.toString() !== req.user._id.toString() &&
      application.employerId.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền xóa đơn này',
      });
    }

    await Application.findByIdAndDelete(req.params.id);

    // Cập nhật số ứng viên
    await Job.findByIdAndUpdate(application.jobId, {
      $inc: { applicationsCount: -1 },
    });

    res.status(200).json({
      success: true,
      message: 'Xóa đơn ứng tuyển thành công',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   GET /api/applications/candidate/:candidateId
 * @desc    Lấy danh sách đơn của ứng viên
 * @access  Public
 */
export const getCandidateApplications = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;

    const applications = await Application.find({ candidateId: req.params.candidateId })
      .populate('jobId', 'title companyName salary')
      .sort({ appliedAt: -1 })
      .limit(parseInt(limit))
      .skip(startIndex);

    const total = await Application.countDocuments({
      candidateId: req.params.candidateId,
    });

    res.status(200).json({
      success: true,
      data: applications,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
