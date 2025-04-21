import { Navigate } from "react-router-dom";

const Index = () => {
  // Redirect to the new landing page
  return <Navigate to="/" replace />;
};

export default Index;
