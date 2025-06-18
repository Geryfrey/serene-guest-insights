
import { User, UserRole } from '@/types';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const checkSession = async () => {
      try {
        const savedUser = localStorage.getItem('serene_user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        }
      } catch (e) {
        console.error('Failed to parse user from localStorage');
        localStorage.removeItem('serene_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Mock login for now - you can connect to your backend later
      const mockUsers = [
        { id: '1', email: 'admin@luxuryhotel.com', name: 'Hotel Manager', role: 'hotel_manager' as UserRole, hotelId: '550e8400-e29b-41d4-a716-446655440000' },
        { id: '2', email: 'service@luxuryhotel.com', name: 'Service Manager', role: 'service_manager' as UserRole, hotelId: '550e8400-e29b-41d4-a716-446655440000' },
        { id: '3', email: 'food@luxuryhotel.com', name: 'Food Manager', role: 'food_manager' as UserRole, hotelId: '550e8400-e29b-41d4-a716-446655440000' },
        { id: '4', email: 'facilities@luxuryhotel.com', name: 'Facilities Manager', role: 'facilities_manager' as UserRole, hotelId: '550e8400-e29b-41d4-a716-446655440000' }
      ];

      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && password === 'password123') {
        setUser(foundUser);
        localStorage.setItem('serene_user', JSON.stringify(foundUser));
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('serene_user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

export function useRole(role: UserRole | UserRole[]) {
  const { user } = useAuth();
  
  if (!user) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.role);
  }
  
  return user.role === role;
}
