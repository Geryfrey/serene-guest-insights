
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PageLayout({ children, className }: PageLayoutProps) {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className={cn(
      'min-h-screen bg-background',
      isAuthenticated ? 'mt-16' : '', // Use margin-top instead of padding-top
      className
    )}>
      <div className={cn(
        isAuthenticated ? 'pt-6' : '', // Additional padding for better spacing
      )}>
        {children}
      </div>
    </div>
  );
}
