"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface CompanyProfile {
  userId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  emailAddress: string;
  companyName: string;
  address: string;
  phoneNumber: string;
  role: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  company: CompanyProfile | null;
  login: (userData: CompanyProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  company: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [company, setCompany] = useState<CompanyProfile | null>(null);

  const login = (userData: CompanyProfile) => {
    setIsLoggedIn(true);
    setCompany(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCompany(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, company, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
