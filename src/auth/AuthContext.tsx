import React, { createContext, useContext, ReactNode, useState } from 'react';

interface AuthContextType {
  userRole: String,
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  currRole: (role: String) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  const currRole = (role: any) => setUserRole(role);

  return (
    <AuthContext.Provider value={{ userRole, isAuthenticated, login, logout, currRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};