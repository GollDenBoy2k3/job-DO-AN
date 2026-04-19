// src/controllers/jobController.js
// Controller xử lý công việc (Jobs)

import Job from '../models/Job.js';

/**
 * @route   GET /api/jobs
 * @desc    Lấy danh sách công việc (có filter và pagination)
 * @access  Public
 */
export const getAllJobs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, title, location, jobType, salaryMin, salaryMax, search } = req.query;

    // Tạo filter object
    let filter = { status: 'active' };

    if (title) {
      filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search
    }

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    // Filter theo mức lương
    if (salaryMin || salaryMax) {
      filter.$or = [];
      if (salaryMin) {
        filter.$or.push({ 'salary.max': { $gte: parseInt(salaryMin) } });
      }
      if (salaryMax) {
        filter.$or.push({ 'salary.min': { $lte: parseInt(salaryMax) } });
      }
    }

    // Full text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Pagination
    const startIndex = (page - 1) * limit;

    // Lấy dữ liệu
    const jobs = await Job.find(filter)
      .populate('employerId', 'fullName email')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(startIndex);

    // Tổng số công việc
    const total = await Job.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: jobs,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit),
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
 * @route   GET /api/jobs/:id
 * @desc    Lấy chi tiết một công việc
 * @access  Public
 */
export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { $inc: { viewsCount: 1 } }, // Tăng lượt xem
      { new: true }
    ).populate('employerId', 'fullName email phone employer');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy công việc',
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   POST /api/jobs
 * @desc    Tạo công việc mới (chỉ nhà tuyển dụng)
 * @access  Private (Employer)
 */
export const createJob = async (req, res, next) => {
  try {
    const {
      title,
      description,
      requirements,
      responsibilities,
      category,
      salary,
      jobType,
      location,
      experienceLevel,
      yearsRequired,
      requiredSkills,
      expiryDate,
    } = req.body;

    // Kiểm tra dữ liệu bắt buộc
    if (!title || !description || !salary || !jobType || !location) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập các trường bắt buộc',
      });
    }

    // Tạo công việc mới
    const job = await Job.create({
      title,
      description,
      requirements: requirements || [],
      responsibilities: responsibilities || [],
      category: category || 'Other',
      salary,
      jobType,
      location,
      experienceLevel: experienceLevel || 'junior',
      yearsRequired: yearsRequired || 0,
      requiredSkills: requiredSkills || [],
      employerId: req.user._id,
      companyName: req.user.employer?.companyName || req.user.fullName,
      companyLogo: req.user.employer?.companyLogo || null,
      status: 'draft',
      expiryDate,
    });

    res.status(201).json({
      success: true,
      message: 'Tạo công việc thành công',
      data: job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   PUT /api/jobs/:id
 * @desc    Cập nhật công việc (chỉ chủ sở hữu)
 * @access  Private (Employer)
 */
export const updateJob = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy công việc',
      });
    }

    // Kiểm tra quyền (chỉ nhà tuyển dụng đó mới sửa được)
    if (job.employerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền cập nhật công việc này',
      });
    }

    // Cập nhật các trường
    const allowedFields = [
      'title',
      'description',
      'requirements',
      'responsibilities',
      'category',
      'salary',
      'jobType',
      'location',
      'experienceLevel',
      'yearsRequired',
      'requiredSkills',
      'status',
      'expiryDate',
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        job[field] = req.body[field];
      }
    });

    await job.save();

    res.status(200).json({
      success: true,
      message: 'Cập nhật công việc thành công',
      data: job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   DELETE /api/jobs/:id
 * @desc    Xóa công việc (chỉ chủ sở hữu)
 * @access  Private (Employer)
 */
export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy công việc',
      });
    }

    // Kiểm tra quyền
    if (job.employerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền xóa công việc này',
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Xóa công việc thành công',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @route   GET /api/jobs/employer/:employerId
 * @desc    Lấy danh sách công việc của một nhà tuyển dụng
 * @access  Public
 */
export const getJobsByEmployer = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;

    const jobs = await Job.find({ employerId: req.params.employerId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(startIndex);

    const total = await Job.countDocuments({ employerId: req.params.employerId });

    res.status(200).json({
      success: true,
      data: jobs,
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
