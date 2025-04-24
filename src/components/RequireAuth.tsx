
import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login page with the return url
      navigate('/login', { 
        replace: true, 
        state: { from: location.pathname } 
      });
    }
  }, [user, loading, navigate, location]);

  // Show loading or nothing while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 border-4 border-t-briefme-primary border-r-transparent border-b-briefme-primary border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If authenticated, show the protected content
  return user ? <>{children}</> : null;
}
