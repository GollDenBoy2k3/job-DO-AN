// src/services/jobService.js
// Service để quản lý job operations

import apiClient from '../utils/api';

/**
 * Lấy danh sách công việc
 */
export const getJobs = async (filters = {}, page = 1, limit = 10) => {
  const response = await apiClient.get('/jobs', {
    params: { page, limit, ...filters },
  });
  return response.data;
};

/**
 * Lấy chi tiết công việc
 */
export const getJobById = async (id) => {
  const response = await apiClient.get(`/jobs/${id}`);
  return response.data;
};

/**
 * Tạo công việc mới
 */
export const createJob = async (jobData) => {
  const response = await apiClient.post('/jobs', jobData);
  return response.data;
};

/**
 * Cập nhật công việc
 */
export const updateJob = async (id, jobData) => {
  const response = await apiClient.put(`/jobs/${id}`, jobData);
  return response.data;
};

/**
 * Xóa công việc
 */
export const deleteJob = async (id) => {
  const response = await apiClient.delete(`/jobs/${id}`);
  return response.data;
};

/**
 * Lấy công việc của một nhà tuyển dụng
 */
export const getJobsByEmployer = async (employerId, page = 1, limit = 10) => {
  const response = await apiClient.get(`/jobs/employer/${employerId}`, {
    params: { page, limit },
  });
  return response.data;
};
