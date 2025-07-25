import { useState } from "react";
import { User2, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext"; 

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  created_at: string;
  is_active: boolean;
  is_premium: boolean;
  google_picture?: string;
  google_id?: string;
  auth_provider: string;
  manual_workflow_count: number;
  ai_workflow_count: number;
  total_integrations: number;
  active_workflow_count: number;
}

export default function SecuritySettings({ user }: { user: User }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  const { logout, refetchUser } = useAuth(); 

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized");
      return;
    }

    if (!currentPassword.trim()) {
      toast.error("Current password is required");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("New Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const updatedData = {
        password: currentPassword,
        new_password: newPassword
      };

      await axios.patch("http://127.0.0.1:8000/api/v1/auth/me", updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Password updated successfully");
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");

      await refetchUser();

    } catch (error: any) {
      console.error("Password update error:", error);
      const errorMessage = error.response?.data?.detail || "Failed to update password";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized");
      return;
    }

    if (confirmText !== "delete") {
      toast.error("Please type 'delete' to confirm");
      return;
    }

    setIsLoading(true);

    try {
      await axios.delete("http://127.0.0.1:8000/api/v1/auth/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Account deleted. Goodbye!");
    
      logout();

    } catch (error: any) {
      console.error("Account deletion error:", error);
      const errorMessage = error.response?.data?.detail || "Failed to delete account";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
      setConfirmText("");
    }
  };

  const isGoogleUser = user.auth_provider === "google";

  return (
    <div className="animate-fade-in delay-400">
      <div className="rounded-t-xl border">
        <div className="border-b p-5 bg-emerald-300 dark:bg-emerald-900 rounded-t-xl">
          <div className="flex items-center font-semibold space-x-3">
            <User2 />
            <h1 className="text-xl pb-1">Change Your Password</h1>
          </div>
          <p className="pl-9">Update your password to keep your account secure and protected.</p>
        </div>

        <div className="flex flex-col items-center justify-center px-4 md:px-10 py-5">
          <div className="flex flex-col md:flex-row w-full gap-5">
            {/* Current Password */}
            <div className="flex flex-col w-full relative">
              <label htmlFor="currentPassword" className="text-md font-semibold p-1">
                CURRENT PASSWORD
              </label>
              <div className="relative">
                <input
                  id="currentPassword"
                  type={showCurrent ? "text" : "password"}
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  disabled={isGoogleUser || isLoading}
                  className={`${
                    isGoogleUser 
                      ? "cursor-not-allowed bg-gray-200 dark:bg-gray-200/50 text-gray-500" 
                      : "dark:bg-gray-800 dark:text-white"
                  } border px-5 py-2 rounded-xl pr-10 w-full`}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer flex items-center justify-center"
                  onClick={() => !isGoogleUser && setShowCurrent(!showCurrent)}
                >
                  {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </span>
              </div>
            </div>

            {/* New Password */}
            <div className="flex flex-col w-full relative">
              <label htmlFor="newPassword" className="text-md font-semibold p-1">
                NEW PASSWORD
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showNew ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isGoogleUser || isLoading}
                  className={`${
                    isGoogleUser 
                      ? "cursor-not-allowed bg-gray-200 dark:bg-gray-200/50 text-gray-500" 
                      : "dark:bg-gray-800 dark:text-white"
                  } border px-5 py-2 rounded-xl pr-10 w-full`}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer flex items-center justify-center"
                  onClick={() => !isGoogleUser && setShowNew(!showNew)}
                >
                  {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </span>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="flex flex-col w-full relative">
              <label htmlFor="confirmNewPassword" className="text-md font-semibold p-1">
                CONFIRM NEW PASSWORD
              </label>
              <div className="relative">
                <input
                  id="confirmNewPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  disabled={isGoogleUser || isLoading}
                  className={`${
                    isGoogleUser 
                      ? "cursor-not-allowed bg-gray-200 dark:bg-gray-200/50 text-gray-500" 
                      : "dark:bg-gray-800 dark:text-white"
                  } border px-5 py-2 rounded-xl pr-10 w-full`}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer flex items-center justify-center"
                  onClick={() => !isGoogleUser && setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </span>
              </div>
            </div>
          </div>
        </div>

        {isGoogleUser && (
          <p className="px-4 md:px-10 pb-5 text-sm text-gray-500">
            Accounts created using Google cannot change password
          </p>
        )}

        <div className="px-4 md:px-10 pb-10">
          <Button
            onClick={handleSaveChanges}
            disabled={isGoogleUser || isLoading}
            className={`${
              isGoogleUser || isLoading
                ? "cursor-not-allowed opacity-50" 
                : "cursor-pointer hover:bg-purple-600"
            } px-5 py-5 font-semibold text-white bg-purple-500`}
          >
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </div>

      <div className="px-1 py-10">
        <Button
          className="cursor-pointer"
          variant={"destructive"}
          onClick={() => setShowDeleteModal(true)}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Delete Account"}
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <h2 className="text-lg font-semibold text-red-600">Confirm Delete</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              This action is permanent. Type <strong>delete</strong> to confirm account deletion.
            </p>
            <input
              type="text"
              placeholder="Type 'delete' to confirm"
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              disabled={isLoading}
            />
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => { 
                  setShowDeleteModal(false); 
                  setConfirmText(""); 
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={confirmText !== "delete" || isLoading}
                className={confirmText === "delete" && !isLoading ? "" : "opacity-50 cursor-not-allowed"}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
