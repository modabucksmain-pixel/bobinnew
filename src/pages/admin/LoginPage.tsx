import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, Mail, Zap, Eye, EyeOff, AlertCircle } from 'lucide-react';

export function LoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await signIn(email, password);
    if (success) {
      window.history.pushState({}, '', '/admin');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else {
      setError('Geçersiz e-posta veya şifre.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 page-enter">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
            <Zap className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Girişi</h1>
          <p className="text-zinc-500 text-sm">Bobin Kardeşler yönetim paneli</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6 rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl shadow-2xl">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-200">E-posta</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bobinkardesler.com"
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder:text-zinc-600 focus:border-green-400/60 focus:outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-200">Şifre</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-11 pr-12 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder:text-zinc-600 focus:border-green-400/60 focus:outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-green-500 text-zinc-950 font-bold text-sm hover:bg-green-400 transition shadow-lg shadow-green-500/30 disabled:opacity-50"
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>

          <a href="/" className="block text-center text-zinc-500 text-sm hover:text-green-400 transition">
            ← Ana Sayfaya Dön
          </a>
        </form>
      </div>
    </div>
  );
}
