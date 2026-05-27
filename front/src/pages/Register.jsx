import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

        .reg-page * { box-sizing: border-box; }

        .reg-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
          background: #F3F4F6;
          font-family: 'DM Sans', sans-serif;
        }

        .reg-card {
          width: 100%;
          max-width: 460px;
          background: #fff;
          border: 0.5px solid #E5E7EB;
          border-radius: 16px;
          padding: 2.5rem 2rem;
          position: relative;
          overflow: hidden;
        }

        .reg-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #185FA5, #0F6E56, #534AB7);
        }

        .reg-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 2rem;
        }

        .reg-logo {
          width: 36px;
          height: 36px;
          background: #042C53;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-family: 'DM Serif Display', serif;
          font-size: 18px;
          flex-shrink: 0;
        }

        .reg-brand-title {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          font-weight: 400;
          color: #111827;
          margin: 0;
          line-height: 1.2;
        }

        .reg-brand-sub {
          font-size: 13px;
          color: #6B7280;
          margin: 0;
          font-weight: 300;
        }

        .error-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FEF2F2;
          border: 0.5px solid #FECACA;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 13px;
          color: #B91C1C;
          margin-bottom: 1.25rem;
        }

        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 1.25rem;
        }

        .field-group { margin-bottom: 1.25rem; }
        .field-group-inline { margin-bottom: 0; }

        .field-label {
          display: block;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #6B7280;
          margin-bottom: 6px;
        }

        .field-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .field-icon {
          position: absolute;
          left: 12px;
          color: #9CA3AF;
          font-size: 16px;
          pointer-events: none;
          z-index: 1;
        }

        .field-toggle {
          position: absolute;
          right: 12px;
          color: #9CA3AF;
          font-size: 16px;
          cursor: pointer;
          z-index: 1;
          background: none;
          border: none;
          padding: 0;
          display: flex;
          align-items: center;
        }
        .field-toggle:hover { color: #6B7280; }

        .field-input {
          width: 100%;
          padding: 10px 12px 10px 38px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          background: #F9FAFB;
          border: 0.5px solid #D1D5DB;
          border-radius: 8px;
          color: #111827;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
        }

        .field-input:focus {
          border-color: #185FA5;
          box-shadow: 0 0 0 3px rgba(24, 95, 165, 0.12);
          background: #fff;
        }

        .field-input::placeholder { color: #D1D5DB; }

        .field-input-pw { padding-right: 38px; }

        .field-select {
          width: 100%;
          padding: 10px 36px 10px 38px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          background: #F9FAFB;
          border: 0.5px solid #D1D5DB;
          border-radius: 8px;
          color: #111827;
          outline: none;
          appearance: none;
          cursor: pointer;
          transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
        }

        .field-select:focus {
          border-color: #185FA5;
          box-shadow: 0 0 0 3px rgba(24, 95, 165, 0.12);
          background: #fff;
        }

        .select-chevron {
          position: absolute;
          right: 12px;
          color: #9CA3AF;
          font-size: 16px;
          pointer-events: none;
        }

        .role-pills {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .role-pill {
          padding: 10px 12px;
          border: 0.5px solid #D1D5DB;
          border-radius: 8px;
          background: #F9FAFB;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #374151;
          font-weight: 400;
          transition: all 0.15s;
        }

        .role-pill:hover { background: #EFF6FF; border-color: #BFDBFE; }

        .role-pill.active {
          background: #EFF6FF;
          border-color: #185FA5;
          border-width: 1.5px;
          color: #042C53;
          font-weight: 500;
        }

        .role-pill i { font-size: 18px; }
        .role-pill.active i { color: #185FA5; }
        .role-pill:not(.active) i { color: #9CA3AF; }

        .role-pill-label { line-height: 1.2; }
        .role-pill-sub { font-size: 11px; color: #6B7280; font-weight: 300; display: block; margin-top: 1px; }
        .role-pill.active .role-pill-sub { color: #185FA5; }

        .reg-btn {
          width: 100%;
          margin-top: 1.5rem;
          padding: 11px;
          background: #042C53;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: background 0.15s, transform 0.1s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .reg-btn:hover:not(:disabled) { background: #185FA5; }
        .reg-btn:active:not(:disabled) { transform: scale(0.98); }
        .reg-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .login-row {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 13px;
          color: #6B7280;
        }
        .login-row a { color: #185FA5; text-decoration: none; font-weight: 500; }
        .login-row a:hover { text-decoration: underline; }

        .terms-note {
          font-size: 11px;
          color: #9CA3AF;
          text-align: center;
          margin-top: 1rem;
          line-height: 1.6;
        }
        .terms-note a { color: #6B7280; text-decoration: underline; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinning { animation: spin 0.8s linear infinite; display: inline-block; }
      `}</style>

      <div className="reg-page">
        <div className="reg-card">

          <div className="reg-brand">
            <div className="reg-logo">A</div>
            <div>
              <p className="reg-brand-title">Create account</p>
              <p className="reg-brand-sub">Get started — it's free</p>
            </div>
          </div>

          {error && (
            <div className="error-box">
              <i className="ti ti-alert-circle" style={{ fontSize: 16 }} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Name + Email side by side */}
            <div className="field-row">
              <div className="field-group-inline">
                <label className="field-label" htmlFor="name">Full name</label>
                <div className="field-input-wrap">
                  <i className="ti ti-user field-icon" />
                  <input
                    id="name"
                    className="field-input"
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

              <div className="field-group-inline">
                <label className="field-label" htmlFor="email">Email</label>
                <div className="field-input-wrap">
                  <i className="ti ti-mail field-icon" />
                  <input
                    id="email"
                    className="field-input"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="field-group">
              <label className="field-label" htmlFor="password">Password</label>
              <div className="field-input-wrap">
                <i className="ti ti-lock field-icon" />
                <input
                  id="password"
                  className="field-input field-input-pw"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="field-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <i className={`ti ${showPassword ? 'ti-eye-off' : 'ti-eye'}`} />
                </button>
              </div>
            </div>

            {/* Role */}
            <div className="field-group">
              <label className="field-label">I am a…</label>
              <div className="role-pills">
                <button
                  type="button"
                  className={`role-pill ${form.role === 'jobseeker' ? 'active' : ''}`}
                  onClick={() => setForm({ ...form, role: 'jobseeker' })}
                >
                  <i className="ti ti-briefcase" />
                  <span className="role-pill-label">
                    Job seeker
                    <span className="role-pill-sub">Looking for work</span>
                  </span>
                </button>
                <button
                  type="button"
                  className={`role-pill ${form.role === 'employer' ? 'active' : ''}`}
                  onClick={() => setForm({ ...form, role: 'employer' })}
                >
                  <i className="ti ti-building" />
                  <span className="role-pill-label">
                    Employer
                    <span className="role-pill-sub">Hiring talent</span>
                  </span>
                </button>
              </div>
            </div>

            <button type="submit" className="reg-btn" disabled={loading}>
              {loading ? (
                <>
                  <i className="ti ti-loader-2 spinning" style={{ fontSize: 16 }} />
                  Creating account…
                </>
              ) : (
                <>
                  Create account
                  <i className="ti ti-arrow-right" style={{ fontSize: 16 }} />
                </>
              )}
            </button>
          </form>

          
          <p className="login-row">
            Already have an account? <a href="/login">Sign in</a>
          </p>

        </div>
      </div>
    </>
  );
}