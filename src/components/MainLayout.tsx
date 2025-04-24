
import { ReactNode } from 'react';
import Navbar from './Navbar';
import { useAuth } from '@/context/AuthContext';

interface MainLayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export default function MainLayout({ children, showNav = true }: MainLayoutProps) {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      {showNav && <Navbar />}
      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        {children}
      </main>
      <footer className="py-4 bg-briefme-light border-t">
        <div className="container mx-auto px-4 text-center text-sm text-briefme-neutral">
          © {new Date().getFullYear()} BriefMe. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
