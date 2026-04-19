// src/routes/jobRoutes.js
// Routes cho Jobs

import express from 'express';
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobsByEmployer,
} from '../controllers/jobController.js';
import { protect, protectEmployer, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllJobs);
router.get('/employer/:employerId', getJobsByEmployer);
router.get('/:id', getJobById);

// Protected routes (Employer)
router.post('/', protect, protectEmployer, createJob);
router.put('/:id', protect, protectEmployer, updateJob);
router.delete('/:id', protect, protectEmployer, deleteJob);

export default router;
