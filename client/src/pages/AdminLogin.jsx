import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login } from '../lib/api';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(password);
      toast.success('Welcome back');
      navigate('/admin');
    } catch {
      toast.error('Invalid password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center section-pad">
      <form
        onSubmit={handleSubmit}
        className="card-surface w-full max-w-md p-10 space-y-6"
      >
        <div>
          <h1 className="heading-display text-2xl font-bold mb-2">Admin</h1>
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            Portfolio management — not linked from the public site.
          </p>
        </div>
        <div>
          <label htmlFor="password" className="label-caps block mb-2 !text-white/60">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border rounded-xl px-4 py-3 text-white outline-none focus:border-accent"
            style={{ borderColor: 'var(--color-border)' }}
          />
        </div>
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
