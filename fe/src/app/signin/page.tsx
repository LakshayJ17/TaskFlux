"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import ProcedureAnimation from "@/components/AuthAnimation/procedure-animation";
import { useRedirectIfLoggedIn } from "@/hooks/useRedirectIfLoggedIn";
import { Button } from "@/components/ui/stateful-button";
import GLBViewer from "@/components/GLBViewer";

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
      <div className="bg-gradient-to-br from-emerald-100 via-white to-purple-100 dark:bg-gradient-to-br dark:from-emerald-900 dark:to-purple-900">
        <ProcedureAnimation />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-purple-100 dark:bg-gradient-to-br dark:from-emerald-950 dark:via-black/10 dark:to-purple-950/60">
      <div className="flex w-full md:basis-1/2 justify-center md:mb-0 px-4 md:px-0 mt-10 md:mt-0">
        <div className="bg-white dark:bg-black rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-emerald-700 text-center mb-2 dark:text-purple-600">
            Welcome Back !
          </h2>
          <div className="space-x-2 text-center">
            <span className="text-emerald-500 text-center mb-6">
              New to TaskFlux ?
            </span>
            <Link className="underline text-purple-500 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-600" href={'/signup'} replace>Create a new account</Link>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-3">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-emerald-800 mb-1 dark:text-purple-400">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-purple-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-purple-700 bg-white text-black dark:text-black"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-emerald-800 mb-1 dark:text-purple-400">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-purple-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-purple-700 bg-white text-black dark:text-black"
              />
              <span
                className="absolute right-3 top-9 cursor-pointer"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={0}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5 text-purple-400" /> : <Eye className="w-5 h-5 text-purple-400" />}
              </span>
            </div>
            <Button className="w-full mt-5 bg-gradient-to-br from-purple-400/90 via-purple-700/90 to-purple-600/90 hover:from-purple-400 hover:via-purple-700 hover:to-purple-600 text-white hover:ring-purple-700 dark:bg-gradient-to-br dark:from-emerald-400/90 dark:via-emerald-700/90 dark:to-emerald-600/90 dark:hover:from-emerald-400 dark:hover:via-emerald-700 dark:hover:to-emerald-600 dark:hover:ring-emerald-700" type="submit">Sign In</Button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-emerald-700 dark:border-purple-700"></div>
            <span className="mx-4 text-emerald-800 dark:text-purple-200">Or continue with</span>
            <div className="flex-grow border-t border-emerald-700 dark:border-purple-700"></div>
          </div>

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Google Login Failed")}
          />
        </div>
      </div>
      <div className="w-full md:basis-1/2 flex justify-center items-center">
        <div className="w-full flex justify-center items-center" style={{ maxWidth: 400, minHeight: 300 }}>
          <GLBViewer url="/tasky.glb" />
        </div>
      </div>
    </div>
  );
} 