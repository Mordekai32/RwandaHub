import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { MdEmail, MdLock, MdArrowForward, MdAutorenew, MdPerson, MdWork, MdBusiness } from 'react-icons/md';
import { FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'jobseeker' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 relative overflow-hidden">
      {/* Animated blurred shapes – modern energy */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Glassmorphic card – premium dark */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl border border-white/10 p-8 md:p-10">
          {/* Brand header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <span className="text-white font-serif text-xl">A</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Create account</h1>
              <p className="text-sm text-slate-300">Get started — it's free</p>
            </div>
          </div>

          {/* Error message – glass red */}
          {error && (
            <div className="mb-6 flex items-center gap-2 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 backdrop-blur-sm">
              <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name + Email row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wide text-slate-300 mb-1">
                  Full name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-emerald-400">
                    <MdPerson className="w-4 h-4" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition"
                    placeholder="Full Name"
                    autoComplete="name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-slate-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-emerald-400">
                    <MdEmail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition"
                    placeholder="Email"
                    autoComplete="email"
                  />
                </div>
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wide text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-emerald-400">
                  <MdLock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  className="w-full pl-9 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition"
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-emerald-400 transition"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Role selection pills – dark theme with emerald active */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300 mb-2">
                I am a…
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: 'jobseeker' })}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                    form.role === 'jobseeker'
                      ? 'border-emerald-500 bg-emerald-500/20 shadow-md'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <MdWork className={`w-5 h-5 ${form.role === 'jobseeker' ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <div className="text-left">
                    <div className={`text-sm font-medium ${form.role === 'jobseeker' ? 'text-white' : 'text-slate-300'}`}>
                      Job seeker
                    </div>
                    <div className="text-xs text-slate-400">Looking for work</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: 'employer' })}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                    form.role === 'employer'
                      ? 'border-emerald-500 bg-emerald-500/20 shadow-md'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <MdBusiness className={`w-5 h-5 ${form.role === 'employer' ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <div className="text-left">
                    <div className={`text-sm font-medium ${form.role === 'employer' ? 'text-white' : 'text-slate-300'}`}>
                      Employer
                    </div>
                    <div className="text-xs text-slate-400">Hiring talent</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Submit button – vibrant gradient */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold py-2.5 rounded-lg shadow-md shadow-blue-600/20 hover:from-blue-700 hover:to-emerald-600 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <MdAutorenew className="w-4 h-4 animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  Create account
                  <MdArrowForward className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-slate-300">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-emerald-400 hover:text-emerald-300 transition">
              Sign in
            </Link>
          </p>

          {/* Terms note */}
          <p className="mt-4 text-center text-xs text-slate-400">
            By signing up, you agree to our{' '}
            <Link to="/terms" className="text-slate-300 hover:text-emerald-400 transition underline">Terms</Link> and{' '}
            <Link to="/privacy" className="text-slate-300 hover:text-emerald-400 transition underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}