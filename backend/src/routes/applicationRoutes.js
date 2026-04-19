// src/routes/applicationRoutes.js
// Routes cho Applications

import express from 'express';
import {
  applyJob,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  getCandidateApplications,
} from '../controllers/applicationController.js';
import { protect, protectCandidate, protectEmployer } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.post('/', protect, protectCandidate, applyJob);
router.get('/', protect, getApplications);
router.get('/:id', protect, getApplicationById);
router.put('/:id', protect, protectEmployer, updateApplication);
router.delete('/:id', protect, deleteApplication);

// Public route
router.get('/candidate/:candidateId', getCandidateApplications);

export default router;
