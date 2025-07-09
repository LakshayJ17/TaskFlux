"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      setError("Passwords do not match.");
      return;
    }
    if (!firstName.trim() || !secondName.trim()) {
      setError("Please enter your first and last name.");
      return;
    }
    try {
      const res = await axios.post("/api/signup", {
        firstName,
        secondName,
        email,
        password,
      });
      toast.success("Signup Success: " + JSON.stringify(res.data))

    } catch (error: any) {
      setError(error.response?.data?.detail || error.message);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await axios.post("/api/google-auth", {
        token: credentialResponse.credential,
      });
      toast.success("Google Auth Success: " + JSON.stringify(res.data))
    } catch (error: any) {
      setError(error.response?.data?.detail || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-purple-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-purple-500 mb-2">
          Create your account
        </h2>
        <p className="text-purple-500 mb-6">
          Welcome! Please fill in the details to get started.
        </p>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={secondName}
            onChange={e => setSecondName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
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
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button
            type="submit"
            className="w-full py-2 mt-2 rounded-lg font-semibold bg-gradient-to-r from-emerald-500 to-purple-500 text-white shadow-md hover:from-emerald-600 hover:to-purple-600 transition"
          >
            Sign Up
          </button>
        </form>
        <Separator />
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError("Google Login Failed")}
        />
      </div>
    </div>
  );
} 