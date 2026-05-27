import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaHome, FaBriefcase, FaFileAlt, FaBuilding, FaPlusCircle, 
  FaUserShield, FaUser, FaSignOutAlt, FaBars, FaTimes,
  FaChevronDown, FaUserCircle
} from 'react-icons/fa';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Helper to check if a link is active
  const isActive = (path) => location.pathname === path;

  // Navigation items (based on user role)
  const getNavItems = () => {
    const items = [{ name: 'All Jobs', path: '/jobs', icon: FaBriefcase }];
    if (user) {
      if (user.role === 'jobseeker') {
        items.push({ name: 'My Applications', path: '/my-applications', icon: FaFileAlt });
      }
      if (user.role === 'employer') {
        items.push({ name: 'My Jobs', path: '/employer/jobs', icon: FaBuilding });
      }
      if (user.role === 'admin') {
        items.push({ name: 'Admin', path: '/admin', icon: FaUserShield });
      }
      items.push({ name: 'Profile', path: '/profile', icon: FaUser });
    }
    return items;
  };

  const navItems = getNavItems();

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo with modern blue → emerald gradient */}
            <Link
              to="/"
              className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent hover:opacity-80 transition-all duration-300"
            >
              JobFinder Rwanda
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-blue-50 text-blue-700 shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                    }`}
                  >
                    <Icon size={16} className={active ? 'text-blue-500' : ''} />
                    {item.name}
                  </Link>
                );
              })}

              {/* Post Job button (only for employer) - modern gradient */}
              {user?.role === 'employer' && (
                <Link
                  to="/employer/post"
                  className="ml-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-emerald-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2"
                >
                  <FaPlusCircle size={14} />
                  Post Job
                </Link>
              )}

              {/* User area (Avatar + Dropdown) */}
              {user ? (
                <div className="relative ml-4">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 focus:outline-none group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <FaChevronDown
                      size={12}
                      className={`text-slate-500 transition-transform duration-200 ${
                        userDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {userDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setUserDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-20 animate-fadeIn">
                        <div className="px-4 py-2 border-b border-slate-100">
                          <p className="text-sm font-medium text-slate-900">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                          <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full capitalize">
                            {user.role}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
                        >
                          <FaSignOutAlt size={14} />
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3 ml-4">
                  <Link
                    to="/login"
                    className="text-slate-600 font-medium hover:text-blue-600 transition px-3 py-2"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-emerald-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="p-5 border-b border-slate-100">
            <Link
              to="/"
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent"
              onClick={handleLinkClick}
            >
              JobFinder Rwanda
            </Link>
          </div>

          {/* Navigation links */}
          <div className="flex-1 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-5 py-3 text-sm font-medium transition ${
                    active
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* User info & logout (if logged in) */}
          {user ? (
            <div className="p-4 border-t border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center text-white font-semibold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{user.name}</p>
                  <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  handleLinkClick();
                }}
                className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition"
              >
                <FaSignOutAlt size={14} />
                Logout
              </button>
            </div>
          ) : (
            <div className="p-4 border-t border-slate-100 space-y-2">
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="block w-full text-center bg-slate-50 text-slate-700 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={handleLinkClick}
                className="block w-full text-center bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Add animation keyframes for dropdown fade-in */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}