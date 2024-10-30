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

const AuthContext = createContext(null);

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
      setError(await response.json());
    } else {
      setError("");
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
      router.push("/profile");
    } else {
      setLoginMessage(await response.json());
    }
  };

  const verification = async (token: string) => {
    const response = await fetch(url + "verification?token=" + token);
    if (response.ok) {
      const userData = await response.json();
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

  return (
    <AuthContext.Provider
      value={{
        user,
        registration,
        verification,
        error,
        verificationMessage,
        login,
        loginMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
