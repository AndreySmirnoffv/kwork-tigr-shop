import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthModal } from '../authModal/ui/AuthModal';

export const ProtectedRoute = ({ children } : any) => {
  const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('http://localhost:8000/api/auth/check-tokens', { withCredentials: true });
        setAuthStatus('authenticated');
      } catch (error) {
        setAuthStatus('unauthenticated');
      }
    };

    checkAuth();
  }, []);

  if (authStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (authStatus === 'unauthenticated') {
    return <AuthModal onClose={() => window.location.reload()} />;
  }

  return children;
};