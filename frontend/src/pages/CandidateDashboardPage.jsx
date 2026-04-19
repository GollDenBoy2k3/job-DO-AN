// src/pages/CandidateDashboardPage.jsx
// Dashboard cho ứng viên - xem lịch sử ứng tuyển

import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import apiClient from '../utils/api';
import { useAuth } from '../context/AuthContext';

const CandidateDashboardPage = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filter !== 'all') {
        params.status = filter;
      }

      const response = await apiClient.get('/applications', { params });
      setApplications(response.data.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" />;
      case 'reviewed':
        return <AlertCircle className="text-blue-500" />;
      case 'interview':
        return <AlertCircle className="text-purple-500" />;
      case 'accepted':
        return <CheckCircle className="text-green-500" />;
      case 'rejected':
        return <XCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      interview: 'bg-purple-100 text-purple-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return badges[status] || '';
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Chờ xử lý',
      reviewed: 'Đã xem',
      interview: 'Phỏng vấn',
      accepted: 'Được chấp nhận',
      rejected: 'Bị từ chối',
    };
    return texts[status] || status;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Bảng Điều Khiển Ứng Viên</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-gray-600 text-sm">Tổng ứng tuyển</p>
            <p className="text-3xl font-bold">{applications.length}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm">Chờ xử lý</p>
            <p className="text-3xl font-bold text-yellow-600">
              {applications.filter((a) => a.status === 'pending').length}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm">Phỏng vấn</p>
            <p className="text-3xl font-bold text-purple-600">
              {applications.filter((a) => a.status === 'interview').length}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm">Được chấp nhận</p>
            <p className="text-3xl font-bold text-green-600">
              {applications.filter((a) => a.status === 'accepted').length}
            </p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
        {['all', 'pending', 'reviewed', 'interview', 'accepted', 'rejected'].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {status === 'all'
                ? 'Tất cả'
                : {
                    pending: 'Chờ xử lý',
                    reviewed: 'Đã xem',
                    interview: 'Phỏng vấn',
                    accepted: 'Được chấp nhận',
                    rejected: 'Bị từ chối',
                  }[status]}
            </button>
          )
        )}
      </div>

      {/* Applications List */}
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
                    {app.jobId?.title || 'Công việc'}
                  </h3>
                  <p className="text-gray-600">{app.companyName}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Ứng tuyển: {new Date(app.appliedAt).toLocaleDateString('vi-VN')}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {getStatusIcon(app.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(app.status)}`}>
                    {getStatusText(app.status)}
                  </span>
                </div>
              </div>

              {app.interviewDate && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-purple-600 font-semibold">
                    📅 Phỏng vấn: {new Date(app.interviewDate).toLocaleDateString('vi-VN')}
                  </p>
                  {app.interviewNotes && (
                    <p className="text-sm text-gray-600 mt-2">{app.interviewNotes}</p>
                  )}
                </div>
              )}

              {app.notes && app.status !== 'pending' && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    <strong>Ghi chú:</strong> {app.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-600 text-lg">
            Bạn chưa ứng tuyển công việc nào
          </p>
        </div>
      )}
    </div>
  );
};

export default CandidateDashboardPage;
