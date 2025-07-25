"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import ProcedureAnimation from "@/components/AuthAnimation/procedure-animation";
import { useRedirectIfLoggedIn } from "@/hooks/useRedirectIfLoggedIn";
import { Button } from "@/components/ui/stateful-button";
import GLBViewer from "@/components/GLBViewer";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { refetchUser } = useAuth()

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
      await refetchUser();

      toast.success(`Welcome, ${firstName}! Your account was created successfully`);
      router.push('/dashboard');
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
      await refetchUser()

      toast.success("Signed up with Google successfully!");
      router.push('/dashboard');
    } catch (error: any) {
      const msg = error.response?.data?.detail || error.message || "Google signup failed. Please try again.";
      setError(msg);
      toast.error(msg);
    }
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center bg-gradient-to-br from-emerald-100 via-white to-purple-100 dark:bg-gradient-to-br dark:from-emerald-950 dark:via-black/10 dark:to-purple-950/60">
      <div className="flex w-full md:basis-1/2 justify-center px-4 md:mb-0 md:px-0 mt-5 md:mt-0">
        <div className="bg-white dark:bg-black rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl text-center font-bold text-emerald-700 mb-2 dark:text-purple-600">
            Create your account
          </h2>
          <div className="space-x-2 text-center">
            <span className="text-emerald-500 mb-6">
              Already have an account ?
            </span>
            <Link className="underline text-purple-500 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-600" href={'/signin'} replace>Sign In</Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 mt-10">
            <div className="flex space-x-3">
              <div className="w-full">
                <label htmlFor="firstName" className="block text-sm font-medium text-emerald-800 mb-1 dark:text-purple-400">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-purple-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-purple-700 bg-white text-black dark:text-black"
                />
              </div>
              <div className="w-full">
                <label htmlFor="lastName" className="block text-sm font-medium text-emerald-800 mb-1 dark:text-purple-400">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-purple-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-purple-700 bg-white text-black dark:text-black"
                />
              </div>
            </div>

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
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-purple-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-purple-700 bg-white text-black dark:text-black pr-10"
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
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-emerald-800 mb-1 dark:text-purple-400">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-purple-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-purple-700 bg-white text-black dark:text-black pr-10"
              />
              <span
                className="absolute right-3 top-9 cursor-pointer"
                onClick={() => setShowConfirmPassword((v) => !v)}
                tabIndex={0}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5 text-purple-400" /> : <Eye className="w-5 h-5 text-purple-400" />}
              </span>
            </div>
            <Button className="w-full mt-5 bg-gradient-to-br from-purple-400/90 via-purple-700/90 to-purple-600/90 hover:from-purple-400 hover:via-purple-700 hover:to-purple-600 text-white hover:ring-purple-700 dark:bg-gradient-to-br dark:from-emerald-400/90 dark:via-emerald-700/90 dark:to-emerald-600/90 dark:hover:from-emerald-400 dark:hover:via-emerald-700 dark:hover:to-emerald-600 dark:hover:ring-emerald-700" type="submit">Sign Up</Button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-emerald-700 dark:border-purple-700"></div>
            <span className="mx-4 text-emerald-800 dark:text-purple-200">Or continue with</span>
            <div className="flex-grow border-t border-emerald-700 dark:border-purple-700"></div>
          </div>

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Google Signup Failed")}
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