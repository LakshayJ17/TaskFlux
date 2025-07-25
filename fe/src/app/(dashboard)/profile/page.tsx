"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoaderFour } from "@/components/ui/loader";
import { useAuthIfNotLoggedIn } from "@/hooks/useAuthIfNotLoggedIn"
import { IconLink } from "@tabler/icons-react";
import { Calendar, Crown, Edit, GitFork, Link2, Mail, Play, Plus, Stars } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Integration = {
    id: string;
    name: string;
    status: "CONNECTED" | "DISCONNECTED";
    icon: React.ReactNode;
};

const items: Integration[] = [
    {
        id: "slack",
        name: "Slack",
        status: "CONNECTED",
        icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#fff" /><path d="M10.5 18.5C10.5 19.3284 9.82843 20 9 20C8.17157 20 7.5 19.3284 7.5 18.5C7.5 17.6716 8.17157 17 9 17H10.5V18.5ZM11.75 18.5C11.75 17.6716 12.4216 17 13.25 17C14.0784 17 14.75 17.6716 14.75 18.5V23C14.75 23.8284 14.0784 24.5 13.25 24.5C12.4216 24.5 11.75 23.8284 11.75 23V18.5ZM13.25 10.5C12.4216 10.5 11.75 9.82843 11.75 9C11.75 8.17157 12.4216 7.5 13.25 7.5C14.0784 7.5 14.75 8.17157 14.75 9V10.5H13.25ZM13.25 11.75C14.0784 11.75 14.75 12.4216 14.75 13.25C14.75 14.0784 14.0784 14.75 13.25 14.75H9C8.17157 14.75 7.5 14.0784 7.5 13.25C7.5 12.4216 8.17157 11.75 9 11.75H13.25ZM21.5 13.25C21.5 12.4216 22.1716 11.75 23 11.75C23.8284 11.75 24.5 12.4216 24.5 13.25C24.5 14.0784 23.8284 14.75 23 14.75H21.5V13.25ZM20.25 13.25C20.25 14.0784 19.5784 14.75 18.75 14.75C17.9216 14.75 17.25 14.0784 17.25 13.25V9C17.25 8.17157 17.9216 7.5 18.75 7.5C19.5784 7.5 20.25 8.17157 20.25 9V13.25ZM18.75 21.5C19.5784 21.5 20.25 22.1716 20.25 23C20.25 23.8284 19.5784 24.5 18.75 24.5C17.9216 24.5 17.25 23.8284 17.25 23V21.5H18.75ZM18.75 20.25C17.9216 20.25 17.25 19.5784 17.25 18.75C17.25 17.9216 17.9216 17.25 18.75 17.25H23C23.8284 17.25 24.5 17.9216 24.5 18.75C24.5 19.5784 23.8284 20.25 23 20.25H18.75Z" fill="#611F69" /></svg>,
    },
    {
        id: "google-sheets",
        name: "Google Sheets",
        status: "CONNECTED",
        icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#fff" /><rect x="8" y="8" width="16" height="16" rx="3" fill="#34A853" /><rect x="11" y="11" width="10" height="10" rx="1" fill="#fff" /><rect x="13" y="13" width="6" height="1.5" rx="0.75" fill="#34A853" /><rect x="13" y="16" width="6" height="1.5" rx="0.75" fill="#34A853" /><rect x="13" y="19" width="6" height="1.5" rx="0.75" fill="#34A853" /></svg>,
    },
    {
        id: "salesforce",
        name: "Salesforce",
        status: "CONNECTED",
        icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#fff" /><ellipse cx="16" cy="16" rx="10" ry="7" fill="#00A1E0" /><ellipse cx="16" cy="16" rx="7" ry="4.5" fill="#fff" /></svg>,
    },
    {
        id: "mailchimp",
        name: "Mailchimp",
        status: "DISCONNECTED",
        icon: <Mail />,
    },
];

export default function ProfilePage() {
    const { user, loading, error } = useAuthIfNotLoggedIn();
    const router = useRouter();

    if (loading) return (
        <div className="flex items-center justify-center min-h-[200px] w-full">
            <LoaderFour />
        </div>
    );
    if (error) return <div>Error loading user</div>;
    if (!user) return null;

    const joinedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(user.created_at));

    const totalWorkflows = (user.manual_workflow_count || 0) + (user.ai_workflow_count || 0);

    return (
        <div className="min-h-screen bg-gray-300/10 dark:bg-black px-10 py-12 relative">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:75px_75px]"></div>
            </div>
            <div className="flex gap-8">
                <div className="relative animate-fade-in delay-400 basis-1/4 space-y-5">
                    <div className="border bg-white dark:bg-black rounded-xl flex flex-col items-center justify-center p-8 shadow-lg hover:shadow-xl dark:shadow-purple-500/20 transition-shadow">
                        <div className="mb-4">
                            {user.google_picture ? (
                                <Image
                                    width={30}
                                    height={30}
                                    src={user.google_picture}
                                    referrerPolicy="no-referrer"
                                    alt="Profile"
                                    className="h-14 w-14 rounded-full object-cover border-4 border-purple-300 shadow"
                                />
                            ) : (
                                <div className="h-14 w-14 rounded-full bg-purple-700 flex justify-center items-center text-white font-bold text-4xl border-4 border-purple-300 shadow">
                                    {user.firstName ? user.firstName[0].toUpperCase() : ""}
                                </div>
                            )}
                        </div>

                        {user.is_premium ? (
                            <div className="flex items-center justify-center text-2xl gap-5 font-semibold mb-3">
                                {user.firstName} {user.lastName}
                                <Badge className="text-sm px-5 rounded-2xl text-black bg-yellow-400"><Crown /> Plus</Badge>
                            </div>
                        ) : (
                            <div className="flex text-2xl font-semibold mb-3">
                                {user.firstName} {user.lastName}
                            </div>
                        )}

                        <div className="flex justify-items-start flex-col space-y-2 text-gray-600 dark:text-white">
                            <div className="flex gap-5">
                                <Mail />
                                {user.email}
                            </div>

                            <div className="flex gap-5">
                                <Calendar />
                                Joined {joinedDate}
                            </div>
                        </div>

                        <Button onClick={() => router.push('/settings')} className="flex bg-gradient-to-br from-emerald-400/90 via-emerald-700/90 to-emerald-600/90 hover:from-emerald-400 hover:via-emerald-700 hover:to-emerald-600 text-white w-2xs mt-5 cursor-pointer py-5">
                            <Edit />
                            Edit Profile
                        </Button>
                    </div>

                    <div className="border bg-white dark:bg-black rounded-xl flex flex-col items-center justify-center p-8 shadow-lg hover:shadow-xl dark:shadow-emerald-500/20 transition-shadow">
                        <div className="text-xl font-semibold mb-5">
                            Quick Actions
                        </div>

                        <div className="space-y-2 w-full">
                            <Link href={'/new'} className="flex gap-3 p-3 border rounded-lg text-gray-800 text-light hover:bg-emerald-500 dark:text-white dark:hover:bg-emerald-800 shadow-md hover:shadow-lg transition-shadow"><Plus /> New WorkFlow</Link>
                            <Link href={'/integrations'} className="flex gap-3 p-3 border rounded-lg text-gray-800 text-light hover:bg-emerald-500 dark:text-white dark:hover:bg-emerald-800 shadow-md hover:shadow-lg transition-shadow"><Link2 />Add Integrations</Link>
                            <Link href={'/pricing'} className="flex gap-3 p-3 border rounded-lg text-gray-800 text-light hover:bg-emerald-500 dark:text-white dark:hover:bg-emerald-800 shadow-md hover:shadow-lg transition-shadow"><Stars className="text-yellow-500" /> Upgrade to Plus</Link>
                        </div>
                    </div>
                </div>

                <div className="relative animate-fade-in delay-400 basis-3/4 flex flex-col space-y-6">
                    <div className="flex basis-1/5 gap-3">
                        <div className="basis-1/3 bg-white dark:bg-black rounded-xl border shadow-lg hover:shadow-xl dark:shadow-purple-500/20 transition-shadow flex justify-around items-center p-4 min-h-[90px]">
                            <div className="border rounded-2xl text-white bg-purple-500 p-3"><GitFork size={20} /></div>
                            <div>
                                <div className="text-base font-bold">{totalWorkflows}</div>
                                <div className="text-sm font-semibold text-gray-500">Workflows Created</div>
                            </div>
                        </div>
                        <div className="basis-1/3 bg-white dark:bg-black rounded-xl border shadow-lg hover:shadow-xl dark:shadow-purple-500/20 transition-shadow flex justify-around items-center p-4 min-h-[90px]">
                            <div className="border rounded-2xl text-white bg-purple-500 p-3"><IconLink size={20} /></div>
                            <div>
                                <div className="text-base font-bold">{user.total_integrations || 0}</div>
                                <div className="text-sm font-semibold text-gray-500">Total Integrations</div>
                            </div>
                        </div>
                        <div className="basis-1/3 bg-white dark:bg-black rounded-xl border shadow-lg hover:shadow-xl dark:shadow-purple-500/20 transition-shadow flex justify-around items-center p-4 min-h-[90px]">
                            <div className="border rounded-2xl text-white bg-purple-500 p-3"><Play size={20} /></div>
                            <div>
                                <div className="text-base font-bold">{user.active_workflow_count || 0}</div>
                                <div className="text-sm font-semibold text-gray-500">Active Workflows</div>
                            </div>
                        </div>
                    </div>

                    <div className="basis-4/5 border rounded-xl shadow-lg hover:shadow-xl dark:shadow-emerald-500/20 transition-shadow bg-white dark:bg-black">
                        <div className="flex justify-between px-6 py-6 border-b bg-gray-300/20 rounded-t-xl items-center ">
                            <div className="font-semibold text-xl">Connected Integrations</div>
                            <Button className="flex bg-gradient-to-br from-emerald-400/90 via-emerald-700/90 to-emerald-600/90 hover:from-emerald-400 hover:via-emerald-700 hover:to-emerald-600 text-white w-4xs cursor-pointer py-3 px-4 text-sm"> <Plus size={18} /> Add Integration </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-3 p-4 max-h-[400px] overflow-y-auto dark:text-black">
                            {items.map((item: Integration) => (
                                <div
                                    key={item.id}
                                    className={`
                                        rounded-xl p-4 flex flex-col gap-2 border shadow-md hover:shadow-lg transition-shadow min-h-[90px]
                                        ${item.status === "CONNECTED" ? "bg-emerald-50 dark:bg-emerald-500 border-emerald-300" : "bg-white border-red-300 dark:bg-red-400"}
                                    `}
                                >
                                    <div className="flex flex-col gap-5">
                                        <div className="flex">
                                            <span className="text-xl">{item.icon}</span>
                                            <span className="font-semibold text-base ml-2">{item.name}</span>
                                        </div>
                                        <div
                                            className={`
                                                w-25 px-2 py-0.5 rounded-full text-xs font-semibold
                                                ${item.status === "CONNECTED" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}
                                            `}
                                        >
                                            {item.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}