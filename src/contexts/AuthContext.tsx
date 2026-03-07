import { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface AdminUser {
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: AdminUser | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple admin credentials (can be changed)
const ADMIN_EMAIL = 'admin@bobinkardesler.com';
const ADMIN_PASSWORD = 'bobin2024admin';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const saved = localStorage.getItem('admin_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
      } catch {
        localStorage.removeItem('admin_session');
      }
    }
    setLoading(false);
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<boolean> => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser: AdminUser = { email, isAdmin: true };
      setUser(adminUser);
      localStorage.setItem('admin_session', JSON.stringify(adminUser));
      return true;
    }
    return false;
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('admin_session');
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin: !!user?.isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
