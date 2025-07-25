"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LoaderFour } from "@/components/ui/loader";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, error } = useAuth();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setRedirecting(true);
      router.replace("/");
    }
  }, [loading, user, router]);

  if (loading || redirecting) {
    return (
      <div className="flex items-center justify-center h-[100vh] w-full">
        <LoaderFour />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[100vh] w-full text-red-500">
        Authentication error. Please try signing in again.
      </div>
    );
  }

  return <>{children}</>;
}
