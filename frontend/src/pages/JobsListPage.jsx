// src/pages/JobsListPage.jsx
// Trang danh sách công việc với filter

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import JobCard from '../components/JobCard';
import { useJobs } from '../hooks/useJobs';

const JobsListPage = () => {
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    jobType: '',
    salaryMin: '',
    salaryMax: '',
  });
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const { jobs, loading, pagination } = useJobs(filters, page);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      title: '',
      location: '',
      jobType: '',
      salaryMin: '',
      salaryMax: '',
    });
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Tìm Việc Làm</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Bộ lọc</h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter size={20} />
              </button>
            </div>

            {(showFilters || window.innerWidth >= 1024) && (
              <div className="space-y-4">
                {/* Tên công việc */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    Tên công việc
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={filters.title}
                    onChange={handleFilterChange}
                    placeholder="Nhập tên công việc..."
                    className="input-field"
                  />
                </div>

                {/* Địa điểm */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    Địa điểm
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="Nhập địa điểm..."
                    className="input-field"
                  />
                </div>

                {/* Loại công việc */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    Loại công việc
                  </label>
                  <select
                    name="jobType"
                    value={filters.jobType}
                    onChange={handleFilterChange}
                    className="input-field"
                  >
                    <option value="">Tất cả</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="remote">Remote</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>

                {/* Mức lương */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    Mức lương (triệu đồng)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="salaryMin"
                      value={filters.salaryMin}
                      onChange={handleFilterChange}
                      placeholder="Tối thiểu"
                      className="input-field text-sm"
                    />
                    <input
                      type="number"
                      name="salaryMax"
                      value={filters.salaryMax}
                      onChange={handleFilterChange}
                      placeholder="Tối đa"
                      className="input-field text-sm"
                    />
                  </div>
                </div>

                {/* Clear Button */}
                <button
                  onClick={handleClearFilters}
                  className="w-full btn-secondary"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Jobs List */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="text-center py-12">
              <p>Đang tải...</p>
            </div>
          ) : jobs.length > 0 ? (
            <>
              <div className="grid gap-6">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50"
                  >
                    Trước
                  </button>

                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`px-4 py-2 border rounded-lg ${
                          p === page
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                  <button
                    onClick={() =>
                      setPage(Math.min(pagination.pages, page + 1))
                    }
                    disabled={page === pagination.pages}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50"
                  >
                    Sau
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600 text-lg">
                Không tìm thấy công việc nào phù hợp với bộ lọc
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsListPage;
