
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Navigate to dashboard when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('LoginForm - User authenticated, navigating to dashboard');
      switch (user.role) {
        case 'hotel_manager':
          navigate("/dashboard/hotel", { replace: true });
          break;
        case 'service_manager':
          navigate("/dashboard/service", { replace: true });
          break;
        case 'food_manager':
          navigate("/dashboard/food", { replace: true });
          break;
        case 'facilities_manager':
          navigate("/dashboard/facilities", { replace: true });
          break;
        default:
          navigate("/dashboard", { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    try {
      const success = await login(email, password);
      
      if (!success) {
        setError("Login failed. Please check your credentials.");
      }
      // Navigation will be handled by the useEffect above
    } catch (err: any) {
      console.error('Login error:', err);
      
      if (err?.message?.includes('Email not confirmed')) {
        setError("Please check your email and click the confirmation link before signing in.");
      } else if (err?.message?.includes('Invalid login credentials')) {
        setError("Invalid email or password. Please check your credentials.");
      } else if (err?.message?.includes('Email link is invalid or has expired')) {
        setError("The email confirmation link has expired. Please sign up again.");
      } else {
        setError(err?.message || "An error occurred during login. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl font-serif">Sign In</CardTitle>
          <CardDescription>
            Access your hotel management dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 rounded-md text-sm bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="text-xs text-primary underline-offset-4 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-navy-700 to-navy-600 hover:from-navy-800 hover:to-navy-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
          
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/signup" className="text-primary underline-offset-4 hover:underline">
              Sign up here
            </Link>
          </div>
          
          <div className="text-center text-xs text-muted-foreground">
            <p>Note: You need to confirm your email address before signing in.</p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
