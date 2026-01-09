import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { saveUserData } from '../utils/auth';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.register(formData);

      if (response.success) {
        saveUserData(response.token, response.user);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
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

      <div className="relative z-10 w-full max-w-[520px] rounded-xl border border-[rgba(64,224,208,0.1)] bg-[rgba(18,18,30,0.98)] px-10 py-9 shadow-[0_25px_70px_rgba(0,0,0,0.6)] backdrop-blur-[15px]">
        <div className="mb-6 text-center">
          <h2 className="text-[24px] font-semibold tracking-[1px] text-[#40e0d0]">CREATE ACCOUNT</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="rounded-md border border-[rgba(244,67,54,0.4)] bg-[rgba(244,67,54,0.15)] px-3 py-2 text-center text-[12px] text-[#ff6b6b]">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#aaa]">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="h-12 rounded-md border border-white/10 bg-[rgba(30,30,40,0.8)] px-4 text-[13px] text-[#ddd] placeholder:text-[#888] focus:outline-none focus:border-[rgba(64,224,208,0.4)] focus:shadow-[0_0_0_2px_rgba(64,224,208,0.1)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#aaa]">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="h-12 rounded-md border border-white/10 bg-[rgba(30,30,40,0.8)] px-4 text-[13px] text-[#ddd] [color-scheme:dark] focus:outline-none focus:border-[rgba(64,224,208,0.4)] focus:shadow-[0_0_0_2px_rgba(64,224,208,0.1)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#aaa]">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-12 rounded-md border border-white/10 bg-[rgba(30,30,40,0.8)] px-4 text-[13px] text-[#ddd] placeholder:text-[#888] focus:outline-none focus:border-[rgba(64,224,208,0.4)] focus:shadow-[0_0_0_2px_rgba(64,224,208,0.1)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#aaa]">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              required
              className="h-12 rounded-md border border-white/10 bg-[rgba(30,30,40,0.8)] px-4 text-[13px] text-[#ddd] placeholder:text-[#888] focus:outline-none focus:border-[rgba(64,224,208,0.4)] focus:shadow-[0_0_0_2px_rgba(64,224,208,0.1)]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-md bg-[#40e0d0] py-3 text-[13px] font-bold tracking-[1.5px] text-white shadow-[0_4px_15px_rgba(64,224,208,0.3)] transition hover:shadow-[0_6px_20px_rgba(64,224,208,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'REGISTERING...' : 'REGISTER'}
          </button>
        </form>

        <div className="mt-5 text-center text-[12px] text-[#aaa]">
          Already have an account?{' '}
          <button type="button" onClick={() => navigate('/login')} className="text-[#40e0d0] underline hover:text-[#35c9b8]">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

