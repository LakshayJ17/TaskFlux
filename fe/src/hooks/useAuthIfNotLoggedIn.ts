"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCurrentUser } from "./useCurrentUser";

export function useAuthIfNotLoggedIn() {
    const { user, loading, error } = useCurrentUser();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;
        if (!user) {
            router.push('/');
        }
    }, [user, loading, router]);

    return { user, loading, error };
}