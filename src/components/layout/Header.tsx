
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Bell, LogOut, Settings, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockAlerts } from '@/services/mockData';
import { useState } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  
  const unreadAlerts = mockAlerts.filter(alert => !alert.read && 
    (user?.hotelId ? alert.hotelId === user.hotelId : true)).length;
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  if (!user) return null;
  
  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-card z-50 px-4 animate-fade-in backdrop-blur-sm">
      <div className="h-full max-w-screen-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/dashboard" className="text-2xl font-serif font-semibold mr-8 hover:scale-105 transition-transform duration-200">
            <span className="text-gradient">Serene</span>
            <span className="text-gradient-gold ml-1">Insights</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-sm font-medium transition-all duration-200 hover:text-primary hover:scale-105"
            >
              Dashboard
            </Link>
            <Link
              to="/feedback"
              className="text-sm font-medium transition-all duration-200 hover:text-primary hover:scale-105"
            >
              Feedback
            </Link>
            <Link
              to="/reports"
              className="text-sm font-medium transition-all duration-200 hover:text-primary hover:scale-105"
            >
              Reports
            </Link>
            {user.role === 'hotel_manager' && (
              <Link
                to="/admin"
                className="text-sm font-medium transition-all duration-200 hover:text-primary hover:scale-105"
              >
                Admin Panel
              </Link>
            )}
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:scale-110 transition-transform duration-200">
                <Bell className="h-5 w-5" />
                {unreadAlerts > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 animate-slide-up bg-white/95 backdrop-blur-sm">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {unreadAlerts === 0 ? (
                <div className="py-2 px-4 text-sm text-muted-foreground text-center">
                  No new notifications
                </div>
              ) : (
                mockAlerts
                  .filter(alert => !alert.read && (user.hotelId ? alert.hotelId === user.hotelId : true))
                  .map(alert => (
                    <DropdownMenuItem key={alert.id} className="p-3 cursor-pointer hover:bg-muted/50 transition-colors duration-200">
                      <div>
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(alert.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </DropdownMenuItem>
                  ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-200">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="animate-slide-up bg-white/95 backdrop-blur-sm">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  <p className="text-xs leading-none text-muted-foreground capitalize">
                    {user.role.replace('_', ' ')}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')} className="hover:bg-muted/50 transition-colors duration-200">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className="hover:bg-muted/50 transition-colors duration-200">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="hover:bg-muted/50 transition-colors duration-200">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
