
import { User, UserRole } from '@/types';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

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
    console.log('AuthProvider - Setting up auth listener');
    
    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('AuthProvider - Auth state changed:', event, !!session);
      
      if (event === 'SIGNED_OUT' || !session?.user) {
        setUser(null);
        setIsLoading(false);
        return;
      }
      
      if (session?.user && event === 'SIGNED_IN') {
        // Use setTimeout to avoid blocking the auth state change
        setTimeout(() => {
          fetchUserProfile(session.user);
        }, 0);
      }
    });

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await fetchUserProfile(session.user);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('AuthProvider - Error initializing auth:', error);
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      console.log('AuthProvider - Fetching user profile for:', supabaseUser.id);
      
      const { data: userProfile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error) {
        console.error('AuthProvider - Error fetching user profile:', error);
        // If profile doesn't exist, user might need to complete signup
        setUser(null);
      } else if (userProfile) {
        console.log('AuthProvider - User profile found:', userProfile);
        const user: User = {
          id: userProfile.id,
          email: userProfile.email,
          name: userProfile.name,
          role: userProfile.role as UserRole,
          hotelId: userProfile.hotel_id
        };
        setUser(user);
      }
    } catch (error) {
      console.error('AuthProvider - Error in fetchUserProfile:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('AuthProvider - Login attempt for:', email);
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('AuthProvider - Login error:', error);
        setIsLoading(false);
        throw error;
      }

      if (data.user) {
        console.log('AuthProvider - Login successful');
        // Don't manually fetch profile here - let the auth state change handle it
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('AuthProvider - Login exception:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const signup = async (userData: SignupData): Promise<{ success: boolean; error?: string }> => {
    console.log('AuthProvider - Signup attempt for:', userData.email);
    setIsLoading(true);
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
        }
      });

      if (authError) {
        console.error('AuthProvider - Signup auth error:', authError);
        setIsLoading(false);
        return { success: false, error: authError.message };
      }

      if (!authData.user) {
        setIsLoading(false);
        return { success: false, error: 'Failed to create user account' };
      }

      // Create user profile
      try {
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: userData.email,
            name: userData.name,
            role: userData.role as UserRole,
            hotel_id: userData.role === 'hotel_manager' ? null : '550e8400-e29b-41d4-a716-446655440000',
            category: userData.role === 'service_manager' ? 'service' :
                     userData.role === 'food_manager' ? 'food_quality' :
                     userData.role === 'facilities_manager' ? 'facilities' : 'general',
            password_hash: 'managed_by_supabase_auth'
          });

        if (profileError) {
          console.error('AuthProvider - Profile creation error:', profileError);
          // Don't fail the signup if profile creation fails - user can still verify email
          console.log('AuthProvider - Continuing with signup despite profile error');
        }
      } catch (profileError) {
        console.error('AuthProvider - Profile creation exception:', profileError);
        // Continue with signup
      }

      console.log('AuthProvider - Signup successful');
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error('AuthProvider - Signup exception:', error);
      setIsLoading(false);
      return { success: false, error: 'An error occurred during signup' };
    }
  };

  const logout = async () => {
    console.log('AuthProvider - Logout');
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('AuthProvider - Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    login,
    signup,
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
