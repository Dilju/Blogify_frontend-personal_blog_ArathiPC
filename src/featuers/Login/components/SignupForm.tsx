import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface SignupFormProps {
  onRegister: (name: string, email: string, password: string) => Promise<void>;
}

const Signup: React.FC<SignupFormProps> = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onRegister(name, email, password);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="block">
          Username
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="block">
          Email
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="block">
          Password
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-2 mt-4 hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
