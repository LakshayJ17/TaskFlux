"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/signin", {
        email,
        password,
      });
      alert("Signin Success: " + JSON.stringify(res.data));
    } catch (error: any) {
      setError(error.response?.data?.detail || error.message);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await axios.post("/api/google-auth", {
        token: credentialResponse.credential,
      });
      alert("Google Auth Success: " + JSON.stringify(res.data));
    } catch (error: any) {
      setError(error.response?.data?.detail || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-purple-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-purple-500 mb-2">
          Sign in to TaskFlux
        </h2>
        <p className="text-purple-500 mb-6">
          Welcome back! Please sign in to continue.
        </p>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="w-full py-2 mt-2 rounded-lg font-semibold bg-gradient-to-r from-emerald-500 to-purple-500 text-white shadow-md hover:from-emerald-600 hover:to-purple-600 transition"
          >
            Sign In
          </button>
        </form>
        <hr className="my-6" />
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError("Google Login Failed")}
        />
      </div>
    </div>
  );
} 