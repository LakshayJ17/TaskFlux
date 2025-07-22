import { useState } from "react";
import { User2 } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";

interface UserInterface {
    firstName: string;
    lastName: string;
    email: string;
    auth_provider: string;
}

export default function ProfileSettings({ user }: { user: UserInterface }) {
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)


    const handleSaveChanges = async () => {
        const token = localStorage.getItem("token")
        if (!token) {
            toast.error("Unauthorized");
            return;
        }

        const updatedData: Partial<UserInterface> = {}
        if (firstName !== user.firstName) updatedData.firstName = firstName;
        if (lastName !== user.lastName) updatedData.lastName = lastName;
        if (email !== user.email) updatedData.email = email;

        console.log("Payload", updatedData)

        if (Object.keys(updatedData).length === 0) {
            toast.info("No changes to save");
            return;
        }

        try {
            // console.log("Sending ")
            // console.log("Updated data", updatedData)
            await axios.patch("http://127.0.0.1:8000/api/v1/auth/me",
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },

                })

            toast.success("Profile updated successfully")
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }

    }


    return (
        <div className="animate-fade-in delay-400">
            <div className="rounded-t-xl border">
                <div className="border-b p-5 bg-emerald-300 dark:bg-emerald-900 rounded-t-xl">
                    <div className="flex items-center font-semibold space-x-3">
                        <User2 />
                        <h1 className="text-xl pb-1">Profile Information</h1>
                    </div>

                    <p className="pl-9">Update your profile information and how others see you.</p>
                </div>

                <div className="flex flex-col items-center justify-center px-10 py-5">
                    <div className="flex w-full gap-x-5">
                        <div className="flex flex-col w-full">
                            <label htmlFor="firstName" className="text-md font-semibold p-1">FIRST NAME</label>
                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="border px-5 py-2 rounded-xl"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="lastName" className="text-md font-semibold p-1">LAST NAME</label>
                            <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="border px-5 py-2 rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="email" className="text-md font-semibold p-1 mt-2">EMAIL</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={user.auth_provider === "google"}
                            className={user.auth_provider === "google" ? "cursor-not-allowed bg-gray-200 dark:bg-gray-200/50 border px-5 py-2 rounded-xl text-black" : "border px-5 py-2 rounded-xl"}
                        />
                        {user.auth_provider === "google" && (
                            <p className="p-1 text-sm text-gray-500">Email is managed by Google and cannot be changed.</p>
                        )}

                    </div>
                </div>

                <div className="px-10 pb-10">
                    <Button
                        onClick={handleSaveChanges}
                        className="cursor-pointer px-5 py-5 font-semibold text-white bg-purple-500 hover:bg-purple-600 ">
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    )
}