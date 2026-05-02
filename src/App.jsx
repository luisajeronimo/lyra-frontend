import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import History from "./pages/History";
import SignUp from "./pages/SignUp";

import Sidebar from "./components/Sidebar";

const ProtectedLayout = ({ user, onLogout }) => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans antialiased">
      <Sidebar user={user} onLogout={onLogout} />

      <main className="flex-1 relative flex flex-col overflow-y-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 
        bg-purple-900/20 blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 w-full">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            !isLoggedIn ? (
              <Login onLoginSuccess={handleLoginSuccess} />
            ) : (
              <Navigate to="/" /> 
            )
          } 
        />
        <Route 
          path="/signup" 
          element={
            !isLoggedIn ? (
              <SignUp onLoginSuccess={handleLoginSuccess} />
            ) : (
              <Navigate to="/" /> 
            )
          } 
        />

        <Route 
          element={
            isLoggedIn ? (
              <ProtectedLayout user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" /> 
            )
          }
        >
          <Route index element={<Home user={user} />} />
          <Route path="/history" element={<History user={user} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}