// src/pages/EmployerDashboardPage.jsx
// Dashboard cho nhà tuyển dụng - quản lý công việc và ứng viên

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import apiClient from '../utils/api';
import { useAuth } from '../context/AuthContext';

const EmployerDashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('jobs'); // jobs hoặc applications
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeTab === 'jobs') {
      fetchJobs();
    } else {
      fetchApplications();
    }
  }, [activeTab]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/jobs');
      setJobs(response.data.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/applications');
      setApplications(response.data.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa công việc này?')) return;

    try {
      await apiClient.delete(`/jobs/${jobId}`);
      setJobs(jobs.filter((j) => j._id !== jobId));
      alert('Xóa thành công');
    } catch (error) {
      alert('Lỗi: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Bảng Điều Khiển Nhà Tuyển Dụng</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-6 py-3 rounded-lg font-semibold ${
            activeTab === 'jobs'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Công Việc Của Tôi
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-6 py-3 rounded-lg font-semibold ${
            activeTab === 'applications'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Ứng Viên
        </button>
      </div>

      {/* Jobs Tab */}
      {activeTab === 'jobs' && (
        <>
          <div className="mb-8">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 flex items-center gap-2">
              <Plus size={20} />
              Tạo Công Việc Mới
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p>Đang tải...</p>
            </div>
          ) : jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job._id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800">{job.title}</h3>
                      <p className="text-gray-600">{job.location}</p>
                      <div className="flex gap-4 mt-3 text-sm text-gray-600">
                        <span>💰 {(job.salary.min / 1000000).toFixed(0)}M - {(job.salary.max / 1000000).toFixed(0)}M</span>
                        <span>👥 {job.applicationsCount} ứng viên</span>
                        <span>👁️ {job.viewsCount} lượt xem</span>
                      </div>
                      <div className="mt-2">
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {job.status === 'active' ? 'Đang tuyển' : 'Nháp'}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job._id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600 text-lg">
                Bạn chưa tạo công việc nào
              </p>
            </div>
          )}
        </>
      )}

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <>
          {loading ? (
            <div className="text-center py-12">
              <p>Đang tải...</p>
            </div>
          ) : applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app._id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">
                        {app.candidateName}
                      </h3>
                      <p className="text-gray-600">{app.candidateEmail}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        📝 Công việc: <strong>{app.jobTitle}</strong>
                      </p>
                      <p className="text-sm text-gray-600">
                        📱 {app.candidatePhone}
                      </p>

                      {app.coverLetter && (
                        <div className="mt-3 p-3 bg-gray-50 rounded">
                          <p className="text-sm text-gray-700">
                            <strong>Thư xin việc:</strong> {app.coverLetter}
                          </p>
                        </div>
                      )}

                      <div className="mt-3">
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          app.status === 'interview' ? 'bg-purple-100 text-purple-800' :
                          app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600 text-lg">
                Bạn chưa có ứng viên nào
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EmployerDashboardPage;
