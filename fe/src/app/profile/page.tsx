"use client"

import Header from "@/components/layout/Header"
import { Button } from "@/components/ui/button";

import { useAuthIfNotLoggedIn } from "@/hooks/useAuthIfNotLoggedIn"
import { Calendar, Edit, Link, Mail, Pencil, Plus, Settings } from "lucide-react";

export default function ProfilePage() {
    const { user, loading, error } = useAuthIfNotLoggedIn();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading user</div>;
    if (!user) return null;
    return (
        <>
            <Header />
            <div className="flex bg-gray-200/10 gap-5 m-8">
                <div className="basis-1/4 space-y-7">
                    <div className="border bg-white rounded-xl flex flex-col items-center justify-center p-8 shadow">
                        <div className="mb-4">
                            {user.google_picture ? (
                                <img
                                    src={user.google_picture}
                                    referrerPolicy="no-referrer"
                                    alt="Profile"
                                    className="h-16 w-16 rounded-full object-cover border-4 border-purple-300 shadow"
                                />
                            ) : (
                                <div className="h-16 w-16 rounded-full bg-purple-700 flex justify-center items-center text-white font-bold text-4xl border-4 border-purple-300 shadow">
                                    {user.firstName ? user.firstName[0].toUpperCase() : ""}
                                </div>
                            )}
                        </div>

                        <div className="flex text-2xl font-semibold mb-5">
                            {user.firstName} {user.lastName}
                        </div>

                        <div className="space-y-2 text-gray-600">
                            <div className="flex gap-5">
                                <Mail />
                                {user.email}
                            </div>

                            <div className="flex gap-5">
                                <Calendar />
                                Joined {new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                        </div>

                        <Button className="flex bg-gradient-to-r from-emerald-800 to-emerald-400 hover:bg-emerald-700 w-2xs mt-5 cursor-pointer py-5">
                            <Edit />
                            Edit Profile
                        </Button>

                    </div>
                    <div className="border bg-white rounded-xl flex flex-col items-center justify-center p-8 shadow">
                        <div className="text-xl font-semibold mb-5">
                            Quick Actions
                        </div>

                        <div className="space-y-2 w-full">
                            <div className="flex gap-3 p-3 border rounded-lg text-gray-800 text-light"><Plus /> New WorkFlow</div>
                            <div className="flex gap-3 p-3 border rounded-lg text-gray-800 text-light"><Link />Add Integrations</div>
                            <div className="flex gap-3 p-3 border rounded-lg text-gray-800 text-light"><Settings />Settings</div>
                        </div>

                    </div>
                </div>



                <div className="basis-3/4 border bg-white rounded-xl p-8 shadow flex items-center justify-center">
                    <span className="text-gray-400 text-lg">Profile details and settings will go here.</span>
                </div>
            </div>
        </>
    )
}