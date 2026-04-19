// src/pages/JobDetailPage.jsx
// Trang chi tiết công việc

import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { MapPin, DollarSign, Briefcase, Clock } from 'lucide-react';
import { useJobDetail } from '../hooks/useJobs';
import apiClient from '../utils/api';
import { useAuth } from '../context/AuthContext';

const JobDetailPage = () => {
  const { id } = useParams();
  const { job, loading, error } = useJobDetail(id);
  const { user, isAuthenticated } = useAuth();
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [applied, setApplied] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập để ứng tuyển');
      return;
    }

    if (user.role !== 'candidate') {
      alert('Chỉ ứng viên mới có thể ứng tuyển');
      return;
    }

    setApplying(true);

    try {
      await apiClient.post('/applications', {
        jobId: id,
        coverLetter,
      });

      setApplied(true);
      alert('Ứng tuyển thành công!');
    } catch (err) {
      alert(err.response?.data?.message || 'Ứng tuyển thất bại');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p>Đang tải...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-red-600">{error || 'Không tìm thấy công việc'}</p>
      </div>
    );
  }

  const formatSalary = (min, max) => {
    return `${(min / 1000000).toFixed(0)}M - ${(max / 1000000).toFixed(0)}M VND`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Header */}
            <div className="flex items-start gap-4 mb-8">
              <img
                src={job.companyLogo || 'https://via.placeholder.com/80'}
                alt={job.companyName}
                className="w-20 h-20 rounded"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
                <p className="text-xl text-gray-600">{job.companyName}</p>
              </div>
            </div>

            {/* Job Details */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <MapPin className="text-blue-600" />
                <div>
                  <p className="text-gray-600 text-sm">Địa điểm</p>
                  <p className="font-semibold">{job.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="text-blue-600" />
                <div>
                  <p className="text-gray-600 text-sm">Mức lương</p>
                  <p className="font-semibold">{formatSalary(job.salary.min, job.salary.max)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Briefcase className="text-blue-600" />
                <div>
                  <p className="text-gray-600 text-sm">Loại công việc</p>
                  <p className="font-semibold capitalize">{job.jobType}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="text-blue-600" />
                <div>
                  <p className="text-gray-600 text-sm">Kinh nghiệm</p>
                  <p className="font-semibold">{job.yearsRequired}+ năm</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Mô tả công việc</h2>
              <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
            </div>

            {/* Responsibilities */}
            {job.responsibilities?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Nhiệm vụ</h2>
                <ul className="list-disc list-inside space-y-2">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-gray-700">
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {job.requirements?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Yêu cầu</h2>
                <ul className="list-disc list-inside space-y-2">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="text-gray-700">
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills */}
            {job.requiredSkills?.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Kỹ năng cần có</h2>
                <div className="flex flex-wrap gap-3">
                  {job.requiredSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <div className="mb-6">
              <p className="text-gray-600 text-sm">Lượt xem</p>
              <p className="text-2xl font-bold">{job.viewsCount}</p>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 text-sm">Ứng viên đã nộp</p>
              <p className="text-2xl font-bold">{job.applicationsCount}</p>
            </div>

            {applied ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                ✓ Bạn đã ứng tuyển công việc này
              </div>
            ) : (
              <form onSubmit={handleApply}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Thư xin việc
                  </label>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="input-field h-32"
                    placeholder="Viết thư xin việc..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={applying || !isAuthenticated}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  {applying ? 'Đang ứng tuyển...' : 'Ứng tuyển ngay'}
                </button>
              </form>
            )}

            {!isAuthenticated && (
              <p className="text-sm text-gray-600 mt-4 text-center">
                Vui lòng <a href="/login" className="text-blue-600 font-bold">đăng nhập</a> để ứng tuyển
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
