import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

        .login-page * { box-sizing: border-box; }

        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
          background: #F3F4F6;
          font-family: 'DM Sans', sans-serif;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          background: #fff;
          border: 0.5px solid #E5E7EB;
          border-radius: 16px;
          padding: 2.5rem 2rem;
          position: relative;
          overflow: hidden;
        }

        .login-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #185FA5, #0F6E56, #534AB7);
        }

        .login-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 2rem;
        }

        .login-logo {
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

        .login-brand-title {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          font-weight: 400;
          color: #111827;
          margin: 0;
          line-height: 1.2;
        }

        .login-brand-sub {
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

        .field-group { margin-bottom: 1.25rem; }

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

        .forgot-link {
          display: block;
          text-align: right;
          font-size: 12px;
          color: #185FA5;
          text-decoration: none;
          margin-top: 6px;
          font-weight: 400;
        }
        .forgot-link:hover { text-decoration: underline; }

        .login-btn {
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
        .login-btn:hover:not(:disabled) { background: #185FA5; }
        .login-btn:active:not(:disabled) { transform: scale(0.98); }
        .login-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 1.5rem 0;
        }
        .divider-line { flex: 1; height: 0.5px; background: #E5E7EB; }
        .divider-text { font-size: 12px; color: #9CA3AF; white-space: nowrap; }

        .sso-btn {
          width: 100%;
          padding: 10px;
          background: transparent;
          border: 0.5px solid #D1D5DB;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #374151;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.15s;
          font-weight: 400;
        }
        .sso-btn:hover { background: #F9FAFB; }

        .signup-row {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 13px;
          color: #6B7280;
        }
        .signup-row a { color: #185FA5; text-decoration: none; font-weight: 500; }
        .signup-row a:hover { text-decoration: underline; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinning { animation: spin 0.8s linear infinite; display: inline-block; }
      `}</style>

      <div className="login-page">
        <div className="login-card">

          <div className="login-brand">
            <div className="login-logo">A</div>
            <div>
              <p className="login-brand-title">Welcome back</p>
              <p className="login-brand-sub">Sign in to your account</p>
            </div>
          </div>

          {error && (
            <div className="error-box">
              <i className="ti ti-alert-circle" style={{ fontSize: 16 }} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label className="field-label" htmlFor="email">Email</label>
              <div className="field-input-wrap">
                <i className="ti ti-mail field-icon" />
                <input
                  id="email"
                  className="field-input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="password">Password</label>
              <div className="field-input-wrap">
                <i className="ti ti-lock field-icon" />
                <input
                  id="password"
                  className="field-input"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
              <a href="/forgot-password" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <>
                  <i className="ti ti-loader-2 spinning" style={{ fontSize: 16 }} />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <i className="ti ti-arrow-right" style={{ fontSize: 16 }} />
                </>
              )}
            </button>
          </form>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">or continue with</span>
            <div className="divider-line" />
          </div>

          <button type="button" className="sso-btn">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908C16.658 14.072 17.64 11.836 17.64 9.2z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          <p className="signup-row">
            Don't have an account? <a href="/register">Create one</a>
          </p>

        </div>
      </div>
    </>
  );
}