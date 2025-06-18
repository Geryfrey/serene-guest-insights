
import SignupForm from "@/components/auth/SignupForm";
import PageLayout from "@/components/layout/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";

export default function Signup() {
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
          Create your hotel management account
        </p>
      </div>
      
      <SignupForm />
      
      <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary underline-offset-4 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </PageLayout>
  );
}
