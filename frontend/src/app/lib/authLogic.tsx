import { createContext, useContext, useState, ReactNode } from "react";

export type AccountTier = "Silver" | "Gold" | "Platinum";
export type AccountType = "retail" | "wholesale" | "bulk";

export interface CompanyProfile {
  name: string;
  email: string;
  contactPerson: string;
  accountType: AccountType;
  tier: AccountTier;
  accountNumber: string;
  manager: string;
  managerPhone: string;
  managerEmail: string;
  creditLimit: number;
  creditUsed: number;
  platforms: string[];
  address: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  company: CompanyProfile | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const MOCK_COMPANY: CompanyProfile = {
  name: "Verde Kitchen Supply Co.",
  email: "orders@verdekitchen.ph",
  contactPerson: "Maria Santos",
  accountType: "wholesale",
  tier: "Gold",
  accountNumber: "OMG-WS-0042",
  manager: "Ryan Dela Cruz",
  managerPhone: "+63 917 888 2241",
  managerEmail: "ryan.dc@omegahouseware.com.ph",
  creditLimit: 150000,
  creditUsed: 45200,
  platforms: ["Shopee", "Lazada"],
  address: "45 Banawe Street, Quezon City, Metro Manila",
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  company: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [company, setCompany] = useState<CompanyProfile | null>(null);

  const login = (_email: string, _password: string) => {
    setIsLoggedIn(true);
    setCompany(MOCK_COMPANY);
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
