
import { User, UserRole } from '@/types';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  role: string;
  hotelName?: string;
  hotelLocation?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider - Initializing');
    
    const initializeAuth = () => {
      try {
        const savedUser = localStorage.getItem('serene_user');
        console.log('AuthProvider - Saved user:', savedUser);
        
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          console.log('AuthProvider - Parsed user:', parsedUser);
          setUser(parsedUser);
        }
      } catch (e) {
        console.error('Failed to parse user from localStorage:', e);
        localStorage.removeItem('serene_user');
      } finally {
        console.log('AuthProvider - Setting loading to false');
        setIsLoading(false);
      }
    };

    // Initialize immediately
    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('AuthProvider - Login attempt for:', email);
    setIsLoading(true);
    
    try {
      // Mock users with the correct emails that match the LoginForm
      const mockUsers = [
        { id: '1', email: 'admin@luxuryhotel.com', name: 'Hotel Manager', role: 'hotel_manager' as UserRole, hotelId: '550e8400-e29b-41d4-a716-446655440000' },
        { id: '2', email: 'service@luxuryhotel.com', name: 'Service Manager', role: 'service_manager' as UserRole, hotelId: '550e8400-e29b-41d4-a716-446655440000' },
        { id: '3', email: 'food@luxuryhotel.com', name: 'Food Manager', role: 'food_manager' as UserRole, hotelId: '550e8400-e29b-41d4-a716-446655440000' },
        { id: '4', email: 'facilities@luxuryhotel.com', name: 'Facilities Manager', role: 'facilities_manager' as UserRole, hotelId: '550e8400-e29b-41d4-a716-446655440000' },
        // Add some commonly used test emails
        { id: '5', email: 'test@test.com', name: 'Test User', role: 'hotel_manager' as UserRole, hotelId: '550e8400-e29b-41d4-a716-446655440000' },
        { id: '6', email: 'demo@demo.com', name: 'Demo User', role: 'hotel_manager' as UserRole, hotelId: '550e8400-e29b-41d4-a716-446655440000' }
      ];

      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && password === 'password123') {
        console.log('AuthProvider - Login successful for:', foundUser);
        setUser(foundUser);
        localStorage.setItem('serene_user', JSON.stringify(foundUser));
        setIsLoading(false);
        return true;
      }
      
      console.log('AuthProvider - Login failed');
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (userData: SignupData): Promise<{ success: boolean; error?: string }> => {
    console.log('AuthProvider - Signup attempt for:', userData.email);
    setIsLoading(true);
    
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('serene_users') || '[]');
      const userExists = existingUsers.some((u: any) => u.email === userData.email);
      
      if (userExists) {
        setIsLoading(false);
        return { success: false, error: 'User with this email already exists' };
      }
      
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: userData.role as UserRole,
        hotelId: userData.role === 'hotel_manager' ? Date.now().toString() : '550e8400-e29b-41d4-a716-446655440000'
      };
      
      // Save to localStorage (simulating database)
      existingUsers.push(newUser);
      localStorage.setItem('serene_users', JSON.stringify(existingUsers));
      
      console.log('AuthProvider - Signup successful for:', newUser);
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      setIsLoading(false);
      return { success: false, error: 'An error occurred during signup' };
    }
  };

  const logout = () => {
    console.log('AuthProvider - Logout');
    setUser(null);
    localStorage.removeItem('serene_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  console.log('AuthProvider - Current state:', value);

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
