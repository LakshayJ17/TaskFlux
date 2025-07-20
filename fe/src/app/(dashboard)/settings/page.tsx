"use client"
import { LoaderFour } from "@/components/ui/loader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuthIfNotLoggedIn } from "@/hooks/useAuthIfNotLoggedIn";
import { Settings, Bell, Shield, Palette, CreditCard, HelpCircle } from "lucide-react";

export default function SettingsPage() {
    const { user, loading, error } = useAuthIfNotLoggedIn();

    if (loading) return (
        <div className="flex items-center justify-center min-h-[200px] w-full">
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
                    {/* Profile content goes here */}
                    <div className="p-6 bg-white rounded-xl shadow">Profile Information</div>
                </TabsContent>
                <TabsContent value="notifications">
                    {/* Notifications content goes here */}
                    <div className="p-6 bg-white rounded-xl shadow">Notification Settings</div>
                </TabsContent>
                <TabsContent value="security">
                    {/* Security content goes here */}
                    <div className="p-6 bg-white rounded-xl shadow">Security Settings</div>
                </TabsContent>
                <TabsContent value="appearance">
                    {/* Appearance content goes here */}
                    <div className="p-6 bg-white rounded-xl shadow">Appearance Settings</div>
                </TabsContent>
                <TabsContent value="billing">
                    {/* Billing content goes here */}
                    <div className="p-6 bg-white rounded-xl shadow">Billing Settings</div>
                </TabsContent>
                <TabsContent value="support">
                    {/* Support content goes here */}
                    <div className="p-6 bg-white rounded-xl shadow">Support</div>
                </TabsContent>
            </Tabs>
        </div>
    );
}