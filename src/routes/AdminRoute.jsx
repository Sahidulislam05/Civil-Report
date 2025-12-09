import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (user && user.role === "admin") {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default AdminRoute;
