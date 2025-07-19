"use client"

import { Button } from "@/components/ui/button";
import { useAuthIfNotLoggedIn } from "@/hooks/useAuthIfNotLoggedIn";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import { MoreVertical, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutCurrentUser } from "@/utils/logoutUser";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const { user, loading, error } = useAuthIfNotLoggedIn();
    const [open, setOpen] = useState(false);
    const router = useRouter();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading user</div>;
    if (!user) return null;

    const handleLogout = () => {
        logoutCurrentUser();
        router.push('/');
    };

    const links = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: (
                <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Profile",
            href: "/profile",
            icon: (
                <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Settings",
            href: "/settings",
            icon: (
                <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
    ];

    return (
        <div
            className={cn(
                "flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
                "h-screen",
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="flex flex-col h-full justify-between gap-10">
                    {/* Top: Navigation Links + Logout */}
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        <div className="mt-8 flex flex-col gap-4">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                            <SidebarLink
                                link={{
                                    label: "Logout",
                                    href: "#",
                                    icon: (
                                        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                                    ),
                                    onClick: handleLogout,
                                }}
                            />
                        </div>
                    </div>
                    {/* Bottom: Profile */}
                    <div className="flex flex-col gap-2 mb-4">
                        <SidebarLink
                            link={{
                                label: user.firstName + " " + user.lastName,
                                href: "#",
                                icon: user.google_picture ? (
                                    <img
                                        src={user.google_picture}
                                        referrerPolicy="no-referrer"
                                        alt="Profile"
                                        className="h-7 w-7 shrink-0 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="h-7 w-7 shrink-0 rounded-full bg-purple-700 flex justify-center items-center text-white font-bold text-lg">
                                        {user.firstName ? user.firstName[0].toUpperCase() : ""}
                                    </div>
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>

            <div className="flex-1 px-8 mt-10">
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
        </div>
    );
}