import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function ModernRegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    role: 'buyer'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0]">
      <div className="max-w-md mx-auto">
        {/* Modern card with glass effect */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 overflow-hidden transition-all duration-300 hover:shadow-xl">
          {/* Decorative top bar */}
          <div className="h-1 w-full bg-gradient-to-r from-[#10B981] to-[#F97316]"></div>

          <div className="p-6 sm:p-8">
            {/* Logo / Brand */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#10B981]/10 mb-3">
                <span className="text-2xl">🌾</span>
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
                Create account
              </h2>
              <p className="text-gray-500 text-sm mt-1">Join our marketplace today</p>
            </div>

            {/* Error alert */}
            {error && (
              <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2 animate-shake">
                <span className="text-lg">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name - floating label */}
              <div className="relative group">
                <input
                  type="text"
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="peer w-full px-4 pt-5 pb-1.5 border border-[#CBD5E1] rounded-xl bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#10B981] peer-placeholder-shown:translate-y-1/2 peer-focus:translate-y-0 transition-all duration-200 pointer-events-none"
                >
                  Full name
                </label>
              </div>

              {/* Email - floating label */}
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="peer w-full px-4 pt-5 pb-1.5 border border-[#CBD5E1] rounded-xl bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#10B981] peer-placeholder-shown:translate-y-1/2 peer-focus:translate-y-0 transition-all duration-200 pointer-events-none"
                >
                  Email address
                </label>
              </div>

              {/* Password - floating label */}
              <div className="relative group">
                <input
                  type="password"
                  id="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="peer w-full px-4 pt-5 pb-1.5 border border-[#CBD5E1] rounded-xl bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#10B981] peer-placeholder-shown:translate-y-1/2 peer-focus:translate-y-0 transition-all duration-200 pointer-events-none"
                >
                  Password
                </label>
              </div>

              {/* Phone - floating label */}
              <div className="relative group">
                <input
                  type="tel"
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="peer w-full px-4 pt-5 pb-1.5 border border-[#CBD5E1] rounded-xl bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="phone"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#10B981] peer-placeholder-shown:translate-y-1/2 peer-focus:translate-y-0 transition-all duration-200 pointer-events-none"
                >
                  Phone number
                </label>
              </div>

              {/* Location - floating label */}
              <div className="relative group">
                <input
                  type="text"
                  id="location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="peer w-full px-4 pt-5 pb-1.5 border border-[#CBD5E1] rounded-xl bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="location"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#10B981] peer-placeholder-shown:translate-y-1/2 peer-focus:translate-y-0 transition-all duration-200 pointer-events-none"
                >
                  Location (e.g., Kigali)
                </label>
              </div>

              {/* Role select */}
              <div>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-4 py-2.5 border border-[#CBD5E1] rounded-xl bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition cursor-pointer"
                >
                  <option value="buyer">Buyer (I want to buy products)</option>
                  <option value="seller">Seller (I want to sell products)</option>
                </select>
              </div>

              {/* Register button with loading state */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#F97316] hover:bg-[#EA580C] active:bg-[#C2410C] text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  'Create account'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#CBD5E1]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white/80 text-gray-500">Or sign up with</span>
              </div>
            </div>

            {/* Social sign-up buttons */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button className="flex items-center justify-center gap-2 border border-[#CBD5E1] rounded-xl py-2 text-gray-700 hover:bg-gray-50 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 border border-[#CBD5E1] rounded-xl py-2 text-gray-700 hover:bg-gray-50 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
                </svg>
                Apple
              </button>
            </div>

            <p className="text-center text-gray-600 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-[#10B981] font-semibold hover:text-[#047857] transition">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Shake animation for error message */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
}