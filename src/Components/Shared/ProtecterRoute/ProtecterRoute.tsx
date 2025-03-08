import React from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtecterRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return children ? children : <Outlet />;
}
