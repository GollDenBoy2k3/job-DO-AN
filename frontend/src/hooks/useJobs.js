// src/hooks/useJobs.js
// Hook để fetch jobs

import { useState, useEffect } from 'react';
import apiClient from '../utils/api';

/**
 * Hook để lấy danh sách công việc
 * @param {object} filters - Filter parameters
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 */
export const useJobs = (filters = {}, page = 1, limit = 10) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/jobs', {
          params: {
            page,
            limit,
            ...filters,
          },
        });

        setJobs(response.data.data);
        setPagination(response.data.pagination);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch jobs');
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters, page, limit]);

  return { jobs, loading, error, pagination };
};

/**
 * Hook để lấy chi tiết một công việc
 * @param {string} jobId - Job ID
 */
export const useJobDetail = (jobId) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`/jobs/${jobId}`);
        setJob(response.data.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch job');
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  return { job, loading, error };
};
