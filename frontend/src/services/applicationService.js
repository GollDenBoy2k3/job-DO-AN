// src/services/applicationService.js
// Service để quản lý application operations

import apiClient from '../utils/api';

/**
 * Tạo đơn ứng tuyển
 */
export const applyJob = async (jobId, coverLetter = '') => {
  const response = await apiClient.post('/applications', {
    jobId,
    coverLetter,
  });
  return response.data;
};

/**
 * Lấy danh sách đơn ứng tuyển
 */
export const getApplications = async (filters = {}, page = 1, limit = 10) => {
  const response = await apiClient.get('/applications', {
    params: { page, limit, ...filters },
  });
  return response.data;
};

/**
 * Lấy chi tiết đơn ứng tuyển
 */
export const getApplicationById = async (id) => {
  const response = await apiClient.get(`/applications/${id}`);
  return response.data;
};

/**
 * Cập nhật trạng thái đơn
 */
export const updateApplication = async (id, data) => {
  const response = await apiClient.put(`/applications/${id}`, data);
  return response.data;
};

/**
 * Xóa đơn ứng tuyển
 */
export const deleteApplication = async (id) => {
  const response = await apiClient.delete(`/applications/${id}`);
  return response.data;
};

/**
 * Lấy đơn ứng tuyển của ứng viên
 */
export const getCandidateApplications = async (candidateId, page = 1, limit = 10) => {
  const response = await apiClient.get(`/applications/candidate/${candidateId}`, {
    params: { page, limit },
  });
  return response.data;
};
