// src/App.jsx
// Main App component

import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobDetailPage from './pages/JobDetailPage';
import JobsListPage from './pages/JobsListPage';
import CandidateDashboardPage from './pages/CandidateDashboardPage';
import EmployerDashboardPage from './pages/EmployerDashboardPage';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user?.role !== requiredRole && user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
        { path: 'jobs', element: <JobsListPage /> },
        { path: 'jobs/:id', element: <JobDetailPage /> },
        {
          path: 'dashboard',
          element: (
            <ProtectedRoute requiredRole="candidate">
              <CandidateDashboardPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'employer/jobs',
          element: (
            <ProtectedRoute requiredRole="employer">
              <EmployerDashboardPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'employer/applications',
          element: (
            <ProtectedRoute requiredRole="employer">
              <EmployerDashboardPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'profile',
          element: (
            <ProtectedRoute>
              <div>Profile Page - Coming Soon</div>
            </ProtectedRoute>
          ),
        },
        { path: '*', element: <Navigate to='/' replace /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

function AppContent() {
  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
