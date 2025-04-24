
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 32,
  };

  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="flex items-center justify-center bg-briefme-primary rounded-lg p-1 text-white">
        <FileText size={iconSizes[size]} />
      </div>
      {showText && (
        <span className={`font-bold ${sizeClasses[size]} text-briefme-dark`}>
          Brief<span className="text-briefme-primary">Me</span>
        </span>
      )}
    </Link>
  );
}
