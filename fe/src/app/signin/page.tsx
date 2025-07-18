"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import ProcedureAnimation from "@/components/AuthAnimation/procedure-animation";
import { Separator } from "@/components/ui/separator";
import { useRedirectIfLoggedIn } from "@/hooks/useRedirectIfLoggedIn";
import { Button } from "@/components/ui/stateful-button";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const router = useRouter();

  useRedirectIfLoggedIn();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/v1/auth/signin", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.access_token);

      toast.success("Successfully signed in");
      setShowAnimation(true);
      // Redirect to dashboard after animation completes (4 seconds)
      setTimeout(() => {
        router.push('/dashboard');
      }, 5000);
    } catch (error: any) {
      const msg = error.response?.data?.detail || error.message || "Signin failed. Please try again.";
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

      toast.success("Signed in with Google successfully!");
      setShowAnimation(true);
      // Redirect to dashboard after animation completes (4 seconds)
      setTimeout(() => {
        router.push('/dashboard');
      }, 8000);
    } catch (error: any) {
      const msg = error.response?.data?.detail || error.message || "Google Login Failed. Please try again.";
      setError(msg);
      toast.error(msg);
    }
  };

  if (showAnimation) {
    return (
      <div className="bg-gradient-to-br from-emerald-100 via-white to-purple-100">
        <ProcedureAnimation />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-purple-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-emerald-700 text-center mb-2">
          Welcome Back !
        </h2>
        <div className="space-x-2 text-center">
          <span className="text-emerald-500 text-center mb-6">
            New to TaskFlux ?
          </span>
          <Link className="underline text-purple-500 hover:text-purple-700" href={'/signup'} replace>Create a new account</Link>
        </div>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-10 space-y-3">
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
          <Button className="w-full bg-purple-600 hover:bg-purple-700 hover:ring-purple-700" type="submit">Sign In</Button>
        </form>
        <Separator className="my-6 border-emerald-800" />
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError("Google Login Failed")}
        />
      </div>
    </div>
  );
} 