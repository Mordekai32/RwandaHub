import { BrowserRouter, Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './contexts/CartContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import SellerDashboardPage from './pages/SellerDashboardPage';
import ProductFormPage from './pages/ProductFormPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrdersPage from './pages/OrdersPage';
import MessagesPage from './pages/MessagesPage';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import CartPage from './pages/CartPage';

// Modern Navbar component with Alibaba colors
const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const cartItemsCount = getCartCount ? getCartCount() : 0;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

  const handleSellClick = () => {
    if (user) {
      navigate('/product/new');
    } else {
      navigate('/login', { state: { from: '/product/new', message: 'Please log in to sell products' } });
    }
    closeMobileMenu();
  };

  const getUserInitials = () => {
    if (user?.name) return user.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  // Alibaba style link classes
  const desktopLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'text-[#FF6A00] font-semibold bg-[#FF6A00]/10'
        : 'text-[#555555] hover:text-[#FF6A00] hover:bg-[#FF6A00]/5'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? 'text-[#FF6A00] font-semibold bg-[#FF6A00]/10'
        : 'text-[#555555] hover:text-[#FF6A00] hover:bg-[#FF6A00]/5'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Logo - Alibaba style */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2 text-2xl font-extrabold tracking-tight transition-all duration-300 hover:scale-105"
          >
            <span className="text-3xl drop-shadow-md">🌾</span>
            <span className="text-[#FF6A00]">Rwanda<span className="text-[#333333]">Market</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={desktopLinkClass} end>
              Home
            </NavLink>

            {/* Sell Button - Alibaba orange */}
            <button
              onClick={handleSellClick}
              className="px-5 py-2 rounded-full bg-[#FF6A00] text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 ml-2"
            >
              Sell
            </button>

            {/* Cart Icon with Badge */}
            <Link to="/cart" className="relative ml-2 p-2 rounded-full hover:bg-gray-100 transition">
              <svg className="w-6 h-6 text-[#555555] hover:text-[#FF6A00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 18v3" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6A00] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {!user ? (
              <>
                <NavLink to="/login" className={desktopLinkClass}>
                  Log in
                </NavLink>
                <NavLink
                  to="/register"
                  className="ml-2 px-5 py-2 rounded-full bg-[#1E88E5] text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Sign up
                </NavLink>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center gap-2 ml-2 p-1.5 rounded-full bg-white border border-gray-200 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6A00]/50"
                >
                  <div className="w-8 h-8 rounded-full bg-[#FF6A00] flex items-center justify-center text-white font-semibold shadow-inner">
                    {getUserInitials()}
                  </div>
                  <svg
                    className={`w-4 h-4 text-[#555555] transition-transform duration-200 ${
                      isUserDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-[#333333] truncate">
                        {user?.name || user?.email}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">{user?.role || 'user'}</p>
                    </div>
                    <NavLink to="/profile" onClick={() => setIsUserDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#555555] hover:text-[#FF6A00] hover:bg-[#FF6A00]/5 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </NavLink>
                    <NavLink to="/orders" onClick={() => setIsUserDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#555555] hover:text-[#FF6A00] hover:bg-[#FF6A00]/5 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Orders
                    </NavLink>
                    {user?.role === 'seller' && (
                      <NavLink to="/seller/dashboard" onClick={() => setIsUserDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#555555] hover:text-[#FF6A00] hover:bg-[#FF6A00]/5 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Dashboard
                      </NavLink>
                    )}
                    {user?.role === 'admin' && (
                      <NavLink to="/admin" onClick={() => setIsUserDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#555555] hover:text-[#FF6A00] hover:bg-[#FF6A00]/5 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        Admin
                      </NavLink>
                    )}
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden relative z-50 p-2 rounded-full text-[#555555] hover:bg-gray-100 focus:outline-none transition-all"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Sheet */}
        <div
          className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300 md:hidden ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={closeMobileMenu}
        />
        <div
          className={`fixed top-0 right-0 bottom-0 w-3/4 max-w-sm z-50 bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-20 pb-6 px-4">
            <div className="space-y-1">
              <NavLink to="/" onClick={closeMobileMenu} className={mobileLinkClass} end>
                Home
              </NavLink>

              {/* Sell Button - mobile */}
              <button onClick={handleSellClick} className="w-full text-left px-4 py-3 rounded-xl bg-[#FF6A00] text-white font-semibold mt-2 shadow-md">
                Sell
              </button>

              {/* Cart Link in Mobile */}
              <Link to="/cart" onClick={closeMobileMenu} className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-[#555555] hover:text-[#FF6A00] hover:bg-[#FF6A00]/5 transition-colors">
                <span>Cart</span>
                {cartItemsCount > 0 && (
                  <span className="bg-[#FF6A00] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {!user ? (
                <>
                  <NavLink to="/login" onClick={closeMobileMenu} className={mobileLinkClass}>
                    Log in
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={closeMobileMenu}
                    className="block w-full mt-3 px-4 py-3 rounded-xl bg-[#1E88E5] text-white font-semibold text-center shadow-md hover:shadow-lg transition"
                  >
                    Sign up
                  </NavLink>
                </>
              ) : (
                <>
                  <div className="my-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-4 py-2 mb-2">
                      <div className="w-10 h-10 rounded-full bg-[#FF6A00] flex items-center justify-center text-white font-bold shadow">
                        {getUserInitials()}
                      </div>
                      <div>
                        <p className="font-semibold text-[#333333]">{user?.name || user?.email}</p>
                        <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                      </div>
                    </div>
                  </div>
                  <NavLink to="/profile" onClick={closeMobileMenu} className={mobileLinkClass}>
                    Profile
                  </NavLink>
                  <NavLink to="/orders" onClick={closeMobileMenu} className={mobileLinkClass}>
                    Orders
                  </NavLink>
                  {user?.role === 'seller' && (
                    <NavLink to="/seller/dashboard" onClick={closeMobileMenu} className={mobileLinkClass}>
                      Seller Dashboard
                    </NavLink>
                  )}
                  {user?.role === 'admin' && (
                    <NavLink to="/admin" onClick={closeMobileMenu} className={mobileLinkClass}>
                      Admin Panel
                    </NavLink>
                  )}
                  <button onClick={handleLogout} className="w-full text-left mt-4 px-4 py-3 rounded-xl text-red-600 font-medium bg-red-50 hover:bg-red-100 transition-colors">
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
      `}</style>
    </nav>
  );
};

// Main App component with CartProvider
export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/seller/dashboard" element={<ProtectedRoute role="seller"><SellerDashboardPage /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute role="admin"><AdminPanel /></ProtectedRoute>} />
              <Route path="/product/new" element={<ProtectedRoute role="seller"><ProductFormPage /></ProtectedRoute>} />
              <Route path="/product/edit/:id" element={<ProtectedRoute role="seller"><ProductFormPage /></ProtectedRoute>} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
              <Route path="/messages/:userId" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}