import { useState } from "react";
import api from "../../../lib/api";
import { toast } from "react-hot-toast";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/auth/login", { email, password });
            console.log("Login response:", response.data)
      return response.data; 
      
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/auth/register", { name, email, password });
       console.log("Signup response:", response.data);
      toast.success("Signup successful! Please log in.");
      return response.data;
     
      
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
}
