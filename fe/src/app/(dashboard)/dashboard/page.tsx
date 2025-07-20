"use client"

import { Button } from "@/components/ui/button";
import { LoaderFour } from "@/components/ui/loader";
import { useAuthIfNotLoggedIn } from "@/hooks/useAuthIfNotLoggedIn";
import { MoreVertical, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const { user, loading, error } = useAuthIfNotLoggedIn();
    const router = useRouter();

    if (loading) return (
        <div className="flex items-center justify-center min-h-[200px] w-full">
            <LoaderFour />
        </div>
    );
    if (error) return <div>Error loading user</div>;
    if (!user) return null;

    return (
        <div className="animate-fade-in delay-400 px-10 mt-10">
            <div className="text-4xl font-bold mb-8">
                Hello, {user.firstName}! Welcome to Your Dashboard
            </div>
            <div className="flex items-center justify-between gap-10 mt-10">
                <div className="text-3xl font-semibold">
                    Your Workflows
                </div>
                <Button onClick={() => router.push('/new')} size="lg" className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-lg font-medium">
                    <PlusCircle />
                    New
                </Button>
            </div>

            <div className="bg-gray-400/20 flex flex-1 justify-between mt-5 px-10 py-3 border rounded-xl">
                <div>Sr. No</div>
                <div>Name</div>
                <div>Created On</div>
                <div>Status</div>
                <div><MoreVertical /></div>
            </div>
        </div>
    )
}