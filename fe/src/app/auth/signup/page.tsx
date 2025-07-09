"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

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
      alert("Signup Success: " + JSON.stringify(res.data));
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
    <div>
      <h2>Create your account</h2>
      <p>Welcome! Please fill in the details to get started.</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        /><br />
        <input
          type="text"
          placeholder="Last Name"
          value={secondName}
          onChange={e => setSecondName(e.target.value)}
          required
        /><br />
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        /><br />
        <Button type="submit">Sign Up</Button>
      </form>
      <hr />
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => setError("Google Login Failed")}
      />
    </div>
  );
} 