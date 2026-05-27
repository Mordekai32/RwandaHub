import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-white via-white to-indigo-50/40 backdrop-blur-sm border-b border-indigo-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent hover:from-indigo-500 hover:to-teal-400 transition-all duration-300"
          >
            JobFinder Rwanda
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/jobs"
              className="text-gray-600 font-medium hover:text-indigo-600 transition-colors duration-200"
            >
              All Jobs
            </Link>

            {user ? (
              <>
                {user.role === 'jobseeker' && (
                  <Link
                    to="/my-applications"
                    className="text-gray-600 font-medium hover:text-indigo-600 transition-colors duration-200"
                  >
                    My Apps
                  </Link>
                )}

                {user.role === 'employer' && (
                  <>
                    <Link
                      to="/employer/jobs"
                      className="text-gray-600 font-medium hover:text-indigo-600 transition-colors duration-200"
                    >
                      My Jobs
                    </Link>
                    <Link
                      to="/employer/post"
                      className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md hover:from-indigo-700 hover:to-indigo-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      ✨ Post Job
                    </Link>
                  </>
                )}

                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-gray-600 font-medium hover:text-indigo-600 transition-colors duration-200"
                  >
                    Admin
                  </Link>
                )}

                <Link
                  to="/profile"
                  className="text-gray-600 font-medium hover:text-indigo-600 transition-colors duration-200"
                >
                  Profile
                </Link>

                <button
                  onClick={logout}
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-100 hover:text-red-700 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 font-medium hover:text-indigo-600 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md hover:from-indigo-700 hover:to-indigo-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button (optional - you can add a hamburger later) */}
          <div className="md:hidden">
            {/* Simple placeholder for mobile menu trigger */}
            <button className="text-gray-600 hover:text-indigo-600 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}