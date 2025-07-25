"use client"

import { useAuth } from "@/context/AuthContext";

export function useCurrentUser() {
    const { user, loading, error } = useAuth();
    
    return { user, loading, error };
}