"use client"

import { useAuthIfNotLoggedIn } from "@/hooks/useAuthIfNotLoggedIn";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { logoutCurrentUser } from "@/utils/logoutUser";
import { useRouter } from "next/navigation";
import { LoaderFour } from "@/components/ui/loader";


export default function UserLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, error } = useAuthIfNotLoggedIn();
    const [open, setOpen] = useState(false);
    const router = useRouter();

    if (loading) return (
      <div className="flex items-center justify-center min-h-[200px] w-full">
        <LoaderFour />
      </div>
    );
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
                "flex w-full flex-1 flex-col overflow-hidden border border-neutral-200 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
                "h-screen",
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="flex flex-col h-full justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        <div>
                            {user.is_premium ? <img className="h-8 w-8 border shadow rounded-sm" src={"./taskflux-plus-logo.png"}></img> : <img className="h-10 w-10 border shadow rounded-sm" src={"./taskflux-logo.png"}></img>}
                        </div>
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


                    <div className="flex flex-col gap-2 mb-4 items-center">
                        <div className="flex items-center gap-2">
                            {user.google_picture ? (
                                <img
                                    src={user.google_picture}
                                    referrerPolicy="no-referrer"
                                    alt="Profile"
                                    className="h-7 w-7 rounded-full object-cover border-2 border-purple-400 mb-1"
                                    
                                />
                            ) : (
                                <div className="h-7 w-7 rounded-full bg-purple-700 flex justify-center items-center text-white font-bold text-lg border-2 border-purple-400 mb-1"
                                >
                                    {user.firstName ? user.firstName[0].toUpperCase() : ""}
                                </div>
                            )}
                            {open && (
                                <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 ml-2">
                                    {user.firstName} {user.lastName}
                                </span>
                            )}
                        </div>
                    </div>
                </SidebarBody>
            </Sidebar>

            <div className="flex-1">
                {children}
            </div>
        </div>

    )
}