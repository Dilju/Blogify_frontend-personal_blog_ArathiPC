import React from "react";
import Signup from "../featuers/Login/components/SignupForm";
import { useSignup } from "../featuers/Login/hooks/useAuth";

const SignupPage: React.FC = () => {
  const { signup, loading } = useSignup();

  const handleRegister = async (name: string, email: string, password: string) => {
    await signup(name, email, password);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {loading ? (
        <p className="text-gray-600">Signing up...</p>
      ) : (
        <Signup onRegister={handleRegister} />
      )}
    </div>
  );
};

export default SignupPage;
