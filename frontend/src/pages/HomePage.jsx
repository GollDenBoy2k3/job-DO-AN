// src/pages/HomePage.jsx
// Trang chủ

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import JobCard from '../components/JobCard';
import { useJobs } from '../hooks/useJobs';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    title: '',
    location: '',
  });

  const { jobs, loading } = useJobs(searchParams, 1, 6);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?title=${searchParams.title}&location=${searchParams.location}`);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Tìm kiếm công việc của mơ ước</h1>
          <p className="text-xl mb-8 opacity-90">
            Khám phá hàng ngàn cơ hội việc làm tại các công ty hàng đầu
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-4 max-w-2xl mx-auto mb-8">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Tên công việc..."
                value={searchParams.title}
                onChange={(e) => setSearchParams({ ...searchParams, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg text-gray-800"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Địa điểm..."
                value={searchParams.location}
                onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                className="w-full px-4 py-3 rounded-lg text-gray-800"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2"
            >
              <Search size={20} />
              Tìm
            </button>
          </form>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Công việc nổi bật</h2>

        {loading ? (
          <div className="text-center py-12">
            <p>Đang tải...</p>
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Không có công việc nào</p>
          </div>
        )}

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/jobs')}
            className="btn-primary text-lg"
          >
            Xem tất cả công việc
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Tại sao chọn JobFinder?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Tìm kiếm dễ dàng</h3>
              <p className="text-gray-600">
                Tìm kiếm công việc với bộ lọc nâng cao theo kỹ năng, mức lương và địa điểm
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Cơ hội tuyệt vời</h3>
              <p className="text-gray-600">
                Kết nối với các công ty hàng đầu và nhà tuyển dụng uy tín
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Nhanh chóng và hiệu quả</h3>
              <p className="text-gray-600">
                Ứng tuyển chỉ với vài cú nhấp chuột
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
