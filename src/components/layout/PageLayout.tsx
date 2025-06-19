
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
      isAuthenticated ? 'pt-20' : '', // Increased from pt-16 to pt-20 for better clearance
      className
    )}>
      {children}
    </div>
  );
}
