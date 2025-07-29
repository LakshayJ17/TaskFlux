"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export function useRedirectIfLoggedIn() {
    const { user, loading, error } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;
        if (user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    return { user, loading, error };
}