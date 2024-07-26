// src/components/ProtectedRouteWithRole.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteWithRole = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Check if token is valid (placeholder logic, implement actual validation)
  const isTokenValid = token && token !== "undefined" && token !== "null";

  return isTokenValid && allowedRoles.includes(role) ? children : <Navigate to="/login" />;
};

export default ProtectedRouteWithRole;
