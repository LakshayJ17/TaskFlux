"use client"

import { Button } from "@/components/ui/button";
import { LogOutIcon, User2Icon } from "lucide-react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Separator } from "../ui/separator";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth } from "@/context/AuthContext"; // Add this import
import Image from "next/image";

export default function Header() {
    const { user } = useCurrentUser();
    const { logout } = useAuth(); // Add this line
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false)
            }
        }

        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [dropdownOpen])

    const handleLogout = () => {
        setDropdownOpen(false);
        logout(); // Use context logout instead of logoutCurrentUser
    };

    return (
        <header className="w-full h-20 flex justify-center items-center border-b-gray-400 bg-white sticky top-0 z-50 px-3 md:px-6 py-5 min-w-full dark:bg-black dark:border-b-gray-900">
            <div className="w-full flex items-center justify-between">
                <Link href={user ? '/dashboard' : '/'} className="flex items-center gap-x-3">
                    <Image width={50} height={50} className="rounded-lg" src="/taskflux-logo.png" alt="TaskFlux Logo" />
                    <div className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-violet-600 bg-clip-text text-transparent">
                        TASKFLUX
                    </div>
                </Link>


                {!user && (
                    <nav className="flex-1 flex justify-center">
                        <div className="hidden md:flex items-center space-x-8 ">
                            <Link href="/#features" className="text-gray-600 dark:text-white hover:text-emerald-600 dark:hover:text-purple-400 transition-colors">
                                Features
                            </Link>
                            <Link href="/#integrations" className="text-gray-600 dark:text-white hover:text-emerald-600 dark:hover:text-purple-400 transition-colors">
                                Integrations
                            </Link>
                            <Link href="/#demo" className="text-gray-600 dark:text-white hover:text-emerald-600 dark:hover:text-purple-400 transition-colors">
                                Demo
                            </Link>
                            <Link href="/pricing" className="text-gray-600 dark:text-white hover:text-emerald-600 dark:hover:text-purple-400 transition-colors">
                                Pricing
                            </Link>
                        </div>
                    </nav>
                )}


                <div className="relative">
                    {user ? (
                        <>
                            {user.google_picture ? (
                                <Image
                                    width={30}
                                    height={30}
                                    src={user.google_picture}
                                    alt="Profile"
                                    referrerPolicy="no-referrer"
                                    className="rounded-full object-cover cursor-pointer"
                                    onClick={() => setDropdownOpen((open) => !open)}
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-purple-700 flex justify-center items-center text-white font-bold text-lg cursor-pointer"
                                    onClick={() => setDropdownOpen((open) => !open)}
                                >
                                    {user.firstName ? user.firstName[0].toUpperCase() : ""}
                                </div>
                            )}
                            {
                                dropdownOpen && (
                                    <div ref={dropdownRef} className="absolute right-0 mt-2 w-40 flex flex-col p-2 space-y-1 bg-white dark:bg-black border-2 border-gray-300 rounded-lg shadow-lg z-50">
                                        <div className="font-bold text-center">
                                            Hello {user.firstName}
                                        </div>

                                        <Separator className="border-black " />
                                        <Button
                                            className="cursor-pointer gap-3"
                                            variant={"ghost"}
                                            onClick={() => {
                                                setDropdownOpen(false)
                                                router.push("/profile")
                                            }}>
                                            <User2Icon />
                                            Profile
                                        </Button>

                                        <Separator />

                                        <Button
                                            className="cursor-pointer gap-3"
                                            variant={"ghost"}
                                            onClick={handleLogout} // Updated this line
                                        >
                                            <LogOutIcon />
                                            Logout
                                        </Button>
                                    </div>
                                )
                            }
                        </>
                    ) : (
                        <div className="flex flex-row space-x-5">
                            <Button onClick={() => router.push('/signin')} variant="outline" size={"lg"} className="cursor-pointer hidden sm:block border-emerald-200 hover:bg-emerald-50 hover:border-emerald-700 bg-transparent">
                                Sign In
                            </Button>
                            <Button
                                onClick={() => router.push('/signup')}
                                size={"lg"}
                                className="bg-violet-500 hover:bg-violet-600 text-white cursor-pointer"
                            >
                                Get Started
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}