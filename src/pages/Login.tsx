import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "../featuers/Login/components/LoginForm";
import { useLogin } from "../featuers/Login/hooks/useAuth";
import { useAuth } from "../store/useAuthStore";
import { toast } from "react-hot-toast";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error } = useLogin();
  const { login: setAuth } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      
      // Store user data and token
      if (response && response.user && response.token) {
        // Ensure we're passing valid user data
        setAuth(response.user, response.token);
        
        toast.success("Login successful!");
        
        // Redirect to intended page or user posts
        const from = location.state?.from?.pathname || "/user-posts";
        navigate(from, { replace: true });
      }
    } catch (err) {
      toast.error(error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <LoginForm onLogin={handleLogin} />
        {loading && <p className="text-center mt-4">Logging in...</p>}
      </main>
    </div>
  );
};


export default Login;
