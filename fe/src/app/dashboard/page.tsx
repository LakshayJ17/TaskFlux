"use client"

import Header from "@/components/layout/Header";
import { useAuthIfNotLoggedIn } from "@/hooks/useAuthIfNotLoggedIn";

export default function Dashboard() {
    const { user, loading, error } = useAuthIfNotLoggedIn();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading user</div>;
    if (!user) return null;

    return (
        <div>
            <Header />
            <div>
                <div className="w-full px-10 mt-10">
                    <div className="text-4xl font-extrabold">Hello, {user.firstName}</div>
                </div>
            </div>
        </div>
    );
}