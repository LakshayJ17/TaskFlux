"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export function useAuthIfNotLoggedIn() {
    const { user, loading, error } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;
        if (!user) {
            router.push('/');
        }
    }, [user, loading, router]);

    return { user, loading, error };
}