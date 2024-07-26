// src/App.js
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Notifications from "./pages/Notifications.jsx";
import Admin from "./pages/Admin.jsx";
import Login from "./pages/Login.jsx";
import Thesis from "./pages/Thesis.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";

import "./App.css";
import ProtectedRouteWithRole from "./components/ProtectRoutes/ProtectedRoutesWithRole.jsx";
import Teacher from "./pages/Teacher.jsx";
import Submit from "./pages/Submit.jsx";
import Council from "./pages/Council.jsx";

function App() {
  const token = localStorage.getItem("token");
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Navbar />
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRouteWithRole
                    allowedRoles={["admin", "teacher", "student"]}>
                    <Home />
                  </ProtectedRouteWithRole>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRouteWithRole allowedRoles={["admin"]}>
                    <Admin />
                  </ProtectedRouteWithRole>
                }
              />
              <Route
                path="/teacher"
                element={
                  <ProtectedRouteWithRole allowedRoles={["teacher"]}>
                    <Teacher />
                  </ProtectedRouteWithRole>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRouteWithRole
                    allowedRoles={["admin", "teacher", "student"]}>
                    <Notifications />
                  </ProtectedRouteWithRole>
                }
              />
              <Route
                path="/theses"
                element={
                  <ProtectedRouteWithRole
                    allowedRoles={["admin", "teacher", "student"]}>
                    <Thesis />
                  </ProtectedRouteWithRole>
                }
              />
              <Route
                path="/submit"
                element={
                  <ProtectedRouteWithRole allowedRoles={["student"]}>
                    <Submit />
                  </ProtectedRouteWithRole>
                }
              />
              <Route
                path="/council"
                element={
                  <ProtectedRouteWithRole allowedRoles={["teacher"]}>
                    <Council />
                  </ProtectedRouteWithRole>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route index path="/login" element={<Login />} />
              <Route
                path="*"
                element={<Navigate to={token ? "/" : "/login"} />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
