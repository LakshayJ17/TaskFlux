"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import ProcedureAnimation from "@/components/AuthAnimation/procedure-animation";
import { useRedirectIfLoggedIn } from "@/hooks/useRedirectIfLoggedIn";
import { Button } from "@/components/ui/stateful-button";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const router = useRouter();


  useRedirectIfLoggedIn()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      const msg = "Passwords do not match.";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      const msg = "Please enter your first and last name.";
      setError(msg);
      toast.error(msg);
      return;
    }
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/v1/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      localStorage.setItem("token", res.data.access_token);

      toast.success(`Welcome, ${firstName}! Your account was created successfully`);

      setShowAnimation(true);
      // Redirect to dashboard after animation completes (4 seconds)
      setTimeout(() => {
        router.push('/dashboard');
      }, 5000);
    } catch (error: any) {
      const msg = error.response?.data?.detail || error.message || "Signup failed. Please try again.";
      setError(msg);
      toast.error(msg);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/v1/auth/google-auth", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.access_token);

      toast.success("Signed up with Google successfully!");
      setShowAnimation(true);
      // Redirect to dashboard after animation completes (4 seconds)
      setTimeout(() => {
        router.push('/dashboard');
      }, 10000);
    } catch (error: any) {
      const msg = error.response?.data?.detail || error.message || "Google signup failed. Please try again.";
      setError(msg);
      toast.error(msg);
    }
  };

  if (showAnimation) {
    return (
      <div className="flex items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-purple-100">
        <ProcedureAnimation />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-purple-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl text-center font-bold text-emerald-700 mb-2">
          Create your account
        </h2>
        <div className="space-x-2 text-center">
          <span className="text-emerald-500 mb-6">
            Already have an account ?
          </span>
          <Link className="underline text-purple-500 hover:text-purple-700" href={'/signin'} replace>Sign In</Link>
        </div>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3 mt-10">
          <div className="flex space-x-3">
            <div className="w-full">
              <label htmlFor="firstName" className="block text-sm font-medium text-emerald-800 mb-1">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <div className="w-full">
              <label htmlFor="lastName" className="block text-sm font-medium text-emerald-800 mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-emerald-800 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-emerald-800 mb-1">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 pr-10"
            />
            <span
              className="absolute right-3 top-9 cursor-pointer"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={0}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
            </span>
          </div>
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-emerald-800 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 pr-10"
            />
            <span
              className="absolute right-3 top-9 cursor-pointer"
              onClick={() => setShowConfirmPassword((v) => !v)}
              tabIndex={0}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
            </span>
          </div>
          <Button className="w-full bg-purple-600 hover:bg-purple-700 hover:ring-purple-700" type="submit">Sign Up</Button>
        </form>
        <Separator className="my-6 border-emerald-800" />

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError("Google Signup Failed")}
        />
      </div>
    </div>
  );
}