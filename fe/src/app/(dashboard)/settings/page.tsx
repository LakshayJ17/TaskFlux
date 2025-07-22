"use client"

import AppearanceSettings from "@/components/settings-components/appearance-settings";
import ProfileSettings from "@/components/settings-components/profile-settings";
import { LoaderFour } from "@/components/ui/loader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuthIfNotLoggedIn } from "@/hooks/useAuthIfNotLoggedIn";
import { Settings, Bell, Shield, Palette, CreditCard, HelpCircle } from "lucide-react";

export default function SettingsPage() {
    const { user, loading, error } = useAuthIfNotLoggedIn();

    if (loading) return (
        <div className="flex items-center justify-center h-[100vh] w-full">
            <LoaderFour />
        </div>
    );
    if (error) return <div>Error loading user</div>;
    if (!user) return null;
    
    return (
        <div className="p-6">
            <div className="flex items-center space-x-5 mb-6">
                <div className="p-4 text-white border bg-emerald-600 rounded-xl">
                    <Settings />
                </div>
                <div>
                    <h1 className="text-2xl font-semibold">Settings</h1>
                    <p>Manage your account preferences and configuration</p>
                </div>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid grid-cols-6 w-full my-6">
                    <TabsTrigger value="profile"><span className="flex items-center gap-2"><span className="icon"><Settings /></span>Profile</span></TabsTrigger>
                    <TabsTrigger value="notifications"><span className="flex items-center gap-2"><Bell />Notifications</span></TabsTrigger>
                    <TabsTrigger value="security"><span className="flex items-center gap-2"><Shield />Security</span></TabsTrigger>
                    <TabsTrigger value="appearance"><span className="flex items-center gap-2"><Palette />Appearance</span></TabsTrigger>
                    <TabsTrigger value="billing"><span className="flex items-center gap-2"><CreditCard />Billing</span></TabsTrigger>
                    <TabsTrigger value="support"><span className="flex items-center gap-2"><HelpCircle />Support</span></TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <ProfileSettings user={user} />
                </TabsContent>
                <TabsContent value="notifications">
                    <div className="p-6 rounded-xl shadow">Notification Settings - Soon</div>
                </TabsContent>
                <TabsContent value="security">
                    <div className="p-6 rounded-xl shadow">Security Settings - Soon</div>
                </TabsContent>
                <TabsContent value="appearance">
                    <AppearanceSettings />
                </TabsContent>
                <TabsContent value="billing">
                    <div className="p-6 rounded-xl shadow">Billing Settings - Soon</div>
                </TabsContent>
                <TabsContent value="support">
                    <div className="p-6 rounded-xl shadow">Support - Soon</div>
                </TabsContent>
            </Tabs>
        </div>
    );
}