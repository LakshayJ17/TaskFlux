"use client"

import { useEffect, useState } from "react";
import axios from "axios";

export function useCurrentUser() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setUser(null);
                    setLoading(false);
                    return;
                }
                const res = await axios.get("http://127.0.0.1:8000/api/v1/auth/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(res.data);
            } catch (err) {
                setError(err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    return { user, loading, error };
}