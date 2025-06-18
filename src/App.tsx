
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import FeedbackPage from "./pages/FeedbackPage";
import Reports from "./pages/Reports";
import AdminPanel from "./pages/AdminPanel";
import GuestFeedback from "./pages/GuestFeedback";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";

const queryClient = new QueryClient();

const ProtectedRoute = ({ 
  children, 
  allowedRoles = ["hotel_manager", "service_manager", "food_manager", "facilities_manager"]
}: { 
  children: React.ReactNode; 
  allowedRoles?: Array<"hotel_manager" | "service_manager" | "food_manager" | "facilities_manager">;
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  
  console.log('ProtectedRoute - isLoading:', isLoading, 'isAuthenticated:', isAuthenticated, 'user:', user);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!isAuthenticated || !user) {
    console.log('Redirecting to login - not authenticated');
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    console.log('Redirecting to home - insufficient role');
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Role-based dashboard redirect component
const DashboardRedirect = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect based on user role
  switch (user.role) {
    case 'hotel_manager':
      return <Navigate to="/dashboard/hotel" replace />;
    case 'service_manager':
      return <Navigate to="/dashboard/service" replace />;
    case 'food_manager':
      return <Navigate to="/dashboard/food" replace />;
    case 'facilities_manager':
      return <Navigate to="/dashboard/facilities" replace />;
    default:
      return <Navigate to="/dashboard/hotel" replace />;
  }
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/feedback" element={<GuestFeedback />} />
      <Route path="/feedback/:hotelId" element={<GuestFeedback />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />

      {/* Role-based dashboard routing */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardRedirect />
        </ProtectedRoute>
      } />
      
      {/* Role-specific dashboards */}
      <Route path="/dashboard/hotel" element={
        <ProtectedRoute allowedRoles={["hotel_manager"]}>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/service" element={
        <ProtectedRoute allowedRoles={["service_manager"]}>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/food" element={
        <ProtectedRoute allowedRoles={["food_manager"]}>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/facilities" element={
        <ProtectedRoute allowedRoles={["facilities_manager"]}>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/reports" element={
        <ProtectedRoute>
          <Reports />
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={["hotel_manager"]}>
          <AdminPanel />
        </ProtectedRoute>
      } />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
