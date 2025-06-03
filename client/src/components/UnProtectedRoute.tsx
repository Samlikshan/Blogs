import React from "react";
import { Navigate } from "react-router-dom";

// import Loading from "./ui/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/reducers/rootReducer";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const UnProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default UnProtectedRoute;
