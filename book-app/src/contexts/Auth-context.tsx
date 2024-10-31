"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

const AuthContext = createContext({
  user: null,
  error: "",
  registration: async (email: string, password: string) => {},
  verification: async (token: string) => {},
  verificationMessage: "",
  login: async (email: string, password: string) => {},
  loginMessage: "",
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState<string>("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const router = useRouter();
  const url = "http://localhost:8080/";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const registration = async (email: string, password: string) => {
    const response = await fetch(url + "registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      setError(await response.text());
    } else {
      toast("Check your email for verification");
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(url + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.ok) {
      const userData = await response.json();
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast("You`ve logged in");
      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } else {
      setLoginMessage(await response.json());
    }
  };

  const verification = async (token: string) => {
    const response = await fetch(url + "verification?token=" + token);
    if (response.ok) {
      const userData = await response.json();
      setUser(userData);
      setVerificationMessage("Email has been successfully verified");
      localStorage.setItem("user", JSON.stringify(userData));
      toast("You`re registered");
      setTimeout(() => {
        router.push("/profile");
      }, 3000);
    } else {
      setVerificationMessage("Verification failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/profile");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        registration,
        verification,
        verificationMessage,
        login,
        loginMessage,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
