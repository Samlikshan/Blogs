import React from "react";
import { Navigate } from "react-router-dom";

// import Loading from "./ui/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/reducers/rootReducer";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // const {isAuthenticated} = ();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  // if (isLoading) {
  //   return <Loading fullPage text="Loading..." />;
  // }

  if (!isAuthenticated) {
    return <Navigate to="/login\" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
