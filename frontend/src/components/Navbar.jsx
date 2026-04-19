// src/components/Navbar.jsx
// Navigation component

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          JobFinder
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Trang chủ
          </Link>

          {isAuthenticated ? (
            <>
              {user?.role === 'candidate' && (
                <>
                  <Link to="/jobs" className="text-gray-700 hover:text-blue-600">
                    Tìm việc
                  </Link>
                  <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                    Đơn ứng tuyển
                  </Link>
                </>
              )}

              {user?.role === 'employer' && (
                <>
                  <Link to="/employer/jobs" className="text-gray-700 hover:text-blue-600">
                    Công việc của tôi
                  </Link>
                  <Link to="/employer/applications" className="text-gray-700 hover:text-blue-600">
                    Ứng viên
                  </Link>
                </>
              )}

              <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                {user?.fullName}
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                <LogOut size={18} />
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t p-4">
          <div className="flex flex-col gap-3">
            <Link to="/" className="text-gray-700 py-2">
              Trang chủ
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role === 'candidate' && (
                  <>
                    <Link to="/jobs" className="text-gray-700 py-2">
                      Tìm việc
                    </Link>
                    <Link to="/dashboard" className="text-gray-700 py-2">
                      Đơn ứng tuyển
                    </Link>
                  </>
                )}

                {user?.role === 'employer' && (
                  <>
                    <Link to="/employer/jobs" className="text-gray-700 py-2">
                      Công việc của tôi
                    </Link>
                    <Link to="/employer/applications" className="text-gray-700 py-2">
                      Ứng viên
                    </Link>
                  </>
                )}

                <Link to="/profile" className="text-gray-700 py-2">
                  Hồ sơ ({user?.fullName})
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg w-full text-left"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 py-2">
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
