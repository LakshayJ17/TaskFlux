"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCurrentUser } from "./useCurrentUser";

export function useRedirectIfLoggedIn() {
    const { user, loading, error } = useCurrentUser();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;
        if (user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    return { user, loading, error };
}