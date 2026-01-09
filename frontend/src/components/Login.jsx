import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { saveUserData } from '../utils/auth';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        saveUserData(response.token, response.user);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1929] to-[#1a237e] p-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[60%] opacity-60"
        style={{
          background:
            'radial-gradient(circle at 20% 50%, rgba(64, 224, 208, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(64, 224, 208, 0.08) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[400px] rounded-xl border border-[rgba(64,224,208,0.1)] bg-[rgba(18,18,30,0.98)] px-10 py-9 shadow-[0_25px_70px_rgba(0,0,0,0.6)] backdrop-blur-[15px]">
        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="w-full cursor-pointer rounded-md bg-[#3b82f6] py-3 text-[13px] font-bold tracking-[1.5px] text-white shadow-[0_4px_15px_rgba(59,130,246,0.35)] transition hover:bg-[#2563eb]"
          >
            SIGN IN
          </button>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full border-2 border-white/10 text-[#999]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
          {error && (
            <div className="rounded-md border border-[rgba(244,67,54,0.4)] bg-[rgba(244,67,54,0.15)] px-3 py-2 text-center text-[12px] text-[#ff6b6b]">
              {error}
            </div>
          )}

          <div className="flex items-center overflow-hidden rounded-md border border-white/10 bg-[rgba(30,30,40,0.8)] transition focus-within:border-[rgba(64,224,208,0.4)] focus-within:bg-[rgba(30,30,40,0.95)] focus-within:shadow-[0_0_0_2px_rgba(64,224,208,0.1)]">
            <span className="flex h-12 w-[52px] flex-none items-center justify-center border-r border-white/10 text-[#aaa]" aria-hidden="true">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-12 w-full flex-1 bg-transparent px-4 text-[13px] text-[#ddd] placeholder:text-[#aaa] placeholder:tracking-[0.3px] focus:outline-none"
            />
          </div>

          <div className="flex items-center overflow-hidden rounded-md border border-white/10 bg-[rgba(30,30,40,0.8)] transition focus-within:border-[rgba(64,224,208,0.4)] focus-within:bg-[rgba(30,30,40,0.95)] focus-within:shadow-[0_0_0_2px_rgba(64,224,208,0.1)]">
            <span className="flex h-12 w-[52px] flex-none items-center justify-center border-r border-white/10 text-[#aaa]" aria-hidden="true">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="h-12 w-full flex-1 bg-transparent px-4 text-[13px] text-[#ddd] placeholder:text-[#aaa] placeholder:tracking-[0.3px] focus:outline-none"
            />
          </div>

          <div className="mt-1 flex items-center justify-between text-[12px] text-[#aaa]">
            <label className="flex cursor-pointer select-none items-center gap-2">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-[14px] w-[14px] accent-[#40e0d0]"
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-[#aaa] transition hover:text-[#40e0d0]">
              Forgot your password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-md bg-[#3b82f6] py-3 text-[13px] font-bold tracking-[1.5px] text-white shadow-[0_4px_15px_rgba(59,130,246,0.35)] transition hover:bg-[#2563eb] hover:shadow-[0_6px_20px_rgba(59,130,246,0.45)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>

          {/* removed per requirement */}
        </form>
      </div>
    </div>
  );
};

export default Login;

