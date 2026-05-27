import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const MARKETPLACE_ITEMS = [
  {
    label: 'Browse Listings',
    description: 'Explore products & services',
    to: '/marketplace',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13M10 19a1 1 0 100 2 1 1 0 000-2zm7 0a1 1 0 100 2 1 1 0 000-2z" />
      </svg>
    ),
  },
  {
    label: 'Services',
    description: 'Hire freelancers & agencies',
    to: '/marketplace/services',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Products',
    description: 'Buy & sell physical items',
    to: '/marketplace/products',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    label: 'Training & Courses',
    description: 'Upskill with local experts',
    to: '/marketplace/training',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    label: 'Post a Listing',
    description: 'Sell your product or service',
    to: '/marketplace/post',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4v16m8-8H4" />
      </svg>
    ),
    highlight: true,
  },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [marketOpen, setMarketOpen] = useState(false);
  const [mobileMarketOpen, setMobileMarketOpen] = useState(false);
  const marketRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMarketOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (marketRef.current && !marketRef.current.contains(e.target)) {
        setMarketOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive(path)
        ? 'text-indigo-600 bg-indigo-50'
        : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50/70'
    }`;

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(79,70,229,0.08)] border-b border-indigo-100/60'
            : 'bg-white/80 backdrop-blur-md border-b border-indigo-100/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* ── Logo ── */}
            <Link
              to="/"
              className="flex items-center gap-1.5 shrink-0"
            >
              <span
                className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent hover:from-indigo-500 hover:to-teal-400 transition-all duration-300"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                JobFinder Rwanda
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse mt-0.5" />
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden md:flex items-center gap-1">
              <Link to="/jobs" className={navLinkClass('/jobs')}>
                All Jobs
              </Link>

              {/* Marketplace Dropdown */}
              <div className="relative" ref={marketRef}>
                <button
                  onClick={() => setMarketOpen((v) => !v)}
                  className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname.startsWith('/marketplace')
                      ? 'text-teal-600 bg-teal-50'
                      : 'text-gray-500 hover:text-teal-600 hover:bg-teal-50/70'
                  }`}
                >
                  Marketplace
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${marketOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Panel */}
                <div
                  className={`absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl border border-gray-100 shadow-xl shadow-teal-100/40 overflow-hidden transition-all duration-200 origin-top ${
                    marketOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="p-2">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 pt-2 pb-1">
                      Marketplace
                    </p>
                    {MARKETPLACE_ITEMS.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group ${
                          item.highlight
                            ? 'text-teal-600 hover:bg-teal-50'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150 ${
                          item.highlight
                            ? 'bg-teal-100 text-teal-600 group-hover:bg-teal-200'
                            : 'bg-gray-100 text-gray-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                        }`}>
                          {item.icon}
                        </span>
                        <div className="min-w-0">
                          <p className={`text-sm font-semibold leading-tight ${item.highlight ? 'text-teal-600' : 'text-gray-800'}`}>
                            {item.label}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5 truncate">{item.description}</p>
                        </div>
                        {item.highlight && (
                          <span className="ml-auto text-[10px] font-bold bg-teal-100 text-teal-600 px-2 py-0.5 rounded-full">
                            New
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 px-4 py-3 bg-gray-50/60">
                    <p className="text-xs text-gray-400">Rwanda's fastest-growing marketplace</p>
                  </div>
                </div>
              </div>

              {user?.role === 'jobseeker' && (
                <Link to="/my-applications" className={navLinkClass('/my-applications')}>
                  My Applications
                </Link>
              )}

              {user?.role === 'employer' && (
                <Link to="/employer/jobs" className={navLinkClass('/employer/jobs')}>
                  My Jobs
                </Link>
              )}

              {user?.role === 'admin' && (
                <Link to="/admin" className={navLinkClass('/admin')}>
                  Admin
                </Link>
              )}
            </div>

            {/* ── Desktop Actions ── */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <>
                  {user.role === 'employer' && (
                    <Link
                      to="/employer/post"
                      className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md shadow-indigo-200 hover:shadow-indigo-300 hover:from-indigo-700 hover:to-indigo-600 hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <span>✦</span>
                      Post a Job
                    </Link>
                  )}

                  <Link to="/profile" className={navLinkClass('/profile')}>
                    Profile
                  </Link>

                  <div className="w-px h-5 bg-indigo-100 mx-1" />

                  {/* Avatar */}
                  <div
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold shadow-sm cursor-pointer hover:scale-110 hover:shadow-indigo-200 hover:shadow-md transition-all duration-200"
                    title={user.name || 'Profile'}
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    {initials}
                  </div>

                  <button
                    onClick={logout}
                    className="text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 px-3 py-2 rounded-full transition-all duration-200 border border-red-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-full border border-transparent hover:border-indigo-200 hover:bg-indigo-50 transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-5 py-2 rounded-full shadow-md shadow-indigo-200 hover:shadow-indigo-300 hover:from-indigo-700 hover:to-indigo-600 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white/95 backdrop-blur-xl border-t border-indigo-100/50 px-4 py-4 space-y-1">
            <Link to="/jobs" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">
              All Jobs
            </Link>

            {/* Mobile Marketplace Accordion */}
            <div>
              <button
                onClick={() => setMobileMarketOpen((v) => !v)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13M10 19a1 1 0 100 2 1 1 0 000-2zm7 0a1 1 0 100 2 1 1 0 000-2z" />
                  </svg>
                  Marketplace
                </span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileMarketOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${mobileMarketOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-teal-100 pl-3">
                  {MARKETPLACE_ITEMS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                        item.highlight
                          ? 'font-semibold text-teal-600 hover:bg-teal-50'
                          : 'font-medium text-gray-600 hover:text-teal-600 hover:bg-teal-50'
                      }`}
                    >
                      <span className="text-gray-400">{item.icon}</span>
                      {item.label}
                      {item.highlight && (
                        <span className="text-[10px] font-bold bg-teal-100 text-teal-600 px-1.5 py-0.5 rounded-full">New</span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {user?.role === 'jobseeker' && (
              <Link to="/my-applications" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">
                My Applications
              </Link>
            )}

            {user?.role === 'employer' && (
              <>
                <Link to="/employer/jobs" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">
                  My Jobs
                </Link>
                <Link to="/employer/post" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-all duration-200">
                  ✦ Post a Job
                </Link>
              </>
            )}

            {user?.role === 'admin' && (
              <Link to="/admin" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">
                Admin
              </Link>
            )}

            {user ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">
                  Profile
                </Link>
                <div className="pt-2 border-t border-indigo-100/50">
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-2 border-t border-indigo-100/50 space-y-2">
                <Link to="/login" className="block px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">
                  Login
                </Link>
                <Link to="/register" className="block text-center bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md hover:from-indigo-700 hover:to-indigo-600 transition-all duration-200">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}