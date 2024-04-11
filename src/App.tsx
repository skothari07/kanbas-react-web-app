import React from 'react';
import './App.css';
import Kanbas from './Kanbas';
import { HashRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from "react-router";
import Signin from './Users/Signin';
import Signup from './Users/Signup';
import { AuthProvider, useAuth } from './auth/AuthContext';

// This function wraps around the component you want to protect
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/Signin" replace />;
};

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/Signin" />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Kanbas/*" element={<ProtectedRoute children={<Kanbas />} />} />
          </Routes>
        </div>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
