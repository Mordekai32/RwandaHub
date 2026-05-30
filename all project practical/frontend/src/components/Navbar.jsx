import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { 
  FaBriefcase, FaFileAlt, FaBuilding, FaPlusCircle, 
  FaUserShield, FaUser, FaSignOutAlt, FaBars, FaTimes,
  FaChevronDown
} from 'react-icons/fa';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const getNavItems = () => {
    const items = [{ 
      name: t('nav.jobs'), 
      path: '/jobs', 
      icon: FaBriefcase 
    }];
    if (user) {
      if (user.role === 'jobseeker') {
        items.push({ name: t('nav.myApplications'), path: '/my-applications', icon: FaFileAlt });
      }
      if (user.role === 'employer') {
        items.push({ name: t('nav.myJobs'), path: '/employer/jobs', icon: FaBuilding });
      }
      if (user.role === 'admin') {
        items.push({ name: t('nav.admin'), path: '/admin', icon: FaUserShield });
      }
      items.push({ name: t('nav.profile'), path: '/profile', icon: FaUser });
    }
    return items;
  };

  const navItems = getNavItems();
  const handleLinkClick = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Navbar with blue/cyan/emerald gradient and softer glass */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-md shadow-slate-200/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo: blue → cyan → emerald gradient */}
            <Link
              to="/"
              className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 via-cyan-600 to-emerald-500 bg-clip-text text-transparent hover:opacity-85 transition-all duration-300"
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
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 shadow-sm'
                        : 'text-slate-600 hover:bg-white/60 hover:text-blue-600'
                    }`}
                  >
                    <Icon size={16} className={active ? 'text-blue-500' : 'text-slate-400 group-hover:text-blue-500'} />
                    {item.name}
                  </Link>
                );
              })}

              {/* Post Job button - modern gradient */}
              {user?.role === 'employer' && (
                <Link
                  to="/employer/post"
                  className="ml-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2"
                >
                  <FaPlusCircle size={14} />
                  {t('nav.postJob')}
                </Link>
              )}

              {/* Language Switcher */}
              <div className="ml-2">
                <LanguageSwitcher />
              </div>

              {/* User area */}
              {user ? (
                <div className="relative ml-4">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 focus:outline-none group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-semibold text-sm shadow-md ring-2 ring-white/60">
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
                      <div className="fixed inset-0 z-10" onClick={() => setUserDropdownOpen(false)} />
                      <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 py-1 z-20 animate-fadeIn">
                        <div className="px-4 py-2 border-b border-slate-100">
                          <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                          <span className="inline-block mt-1 text-xs bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 px-2 py-0.5 rounded-full capitalize">
                            {user.role}
                          </span>
                        </div>
                        <button
                          onClick={() => { setUserDropdownOpen(false); logout(); }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition rounded-b-2xl"
                        >
                          <FaSignOutAlt size={14} />
                          {t('nav.logout')}
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
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {t('nav.getStarted')}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-white/60 focus:outline-none transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar - clean glass */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 bottom-0 w-72 bg-white/95 backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-100">
            <Link
              to="/"
              className="text-xl font-bold bg-gradient-to-r from-blue-700 via-cyan-600 to-emerald-500 bg-clip-text text-transparent"
              onClick={handleLinkClick}
            >
              JobFinder Rwanda
            </Link>
          </div>

          <div className="flex-1 py-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition ${
                    active
                      ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-r-4 border-blue-500'
                      : 'text-slate-600 hover:bg-white/60 hover:text-blue-600'
                  }`}
                >
                  <Icon size={18} className={active ? 'text-blue-500' : 'text-slate-400'} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="px-6 py-4 border-t border-slate-100">
            <p className="text-xs text-slate-400 mb-2">{t('nav.language')}</p>
            <LanguageSwitcher />
          </div>

          {user ? (
            <div className="p-4 border-t border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-semibold shadow-md">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                  <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                </div>
              </div>
              <button
                onClick={() => { logout(); handleLinkClick(); }}
                className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2.5 rounded-xl text-sm font-medium hover:bg-red-100 transition"
              >
                <FaSignOutAlt size={14} />
                {t('nav.logout')}
              </button>
            </div>
          ) : (
            <div className="p-4 border-t border-slate-100 space-y-2">
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="block w-full text-center bg-slate-50 text-slate-700 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-100 transition"
              >
                {t('nav.login')}
              </Link>
              <Link
                to="/register"
                onClick={handleLinkClick}
                className="block w-full text-center bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-2.5 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition"
              >
                {t('nav.getStarted')}
              </Link>
            </div>
          )}
        </div>
      </div>

      <style>{`
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