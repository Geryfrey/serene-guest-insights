
import LoginForm from "@/components/auth/LoginForm";
import PageLayout from "@/components/layout/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <PageLayout className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto text-center mb-8">
        <h1 className="text-4xl font-serif mb-2">
          <span className="text-gradient">Serene</span>
          <span className="text-gradient-gold ml-1">Insights</span>
        </h1>
        <p className="text-muted-foreground">
          AI-Powered Hospitality Feedback Analytics
        </p>
      </div>
      
      <LoginForm />
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Demo Credentials:</p>
        <p>Manager: john@luxuryhotel.com</p>
        <p>Admin: admin@sereneguest.com</p>
        <p className="mt-1">(any password will work)</p>
      </div>
    </PageLayout>
  );
}
