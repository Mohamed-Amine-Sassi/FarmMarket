import axios from "axios";
import type React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          username,
          password,
          role,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.user.role == "buyer") navigate("/buyer-dashboard");
      if (response.data.user.role == "farmer") navigate("/farmer-dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">
              FarmMarket
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={role}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option value="" className="text-gray-400">
                Select Role
              </option>
              <option value="farmer">Farmer</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium">
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
