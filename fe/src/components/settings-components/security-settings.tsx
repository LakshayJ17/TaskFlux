import { useState } from "react";
import { User2, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";

interface PasswordInterface {
  password: string;
  new_password: string;
  auth_provider: string;
}

export default function SecuritySettings({ user }: { user: PasswordInterface }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized");
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

    const updatedData: Partial<PasswordInterface> = {};
    if (currentPassword.trim().length > 0) updatedData.password = currentPassword;
    if (newPassword === confirmNewPassword) updatedData.new_password = newPassword;

    if (Object.keys(updatedData).length === 0) {
      toast.info("No changes to save");
      return;
    }

    try {
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
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized");
      return;
    }

    try {
      await axios.delete("http://127.0.0.1:8000/api/v1/auth/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Account deleted. Goodbye!");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      toast.error("Failed to delete account");
    } finally {
      setShowDeleteModal(false);
      setConfirmText("");
    }
  };

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

        <div className="flex flex-col items-center justify-center px-10 py-5">
          <div className="flex w-full gap-x-5">
            <div className="flex flex-col w-full relative">
              <label htmlFor="currentPassword" className="text-md font-semibold p-1">CURRENT PASSWORD</label>
              <div className="relative">
                <input
                  id="currentPassword"
                  type={showCurrent ? "text" : "password"}
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  disabled={user.auth_provider === "google"}
                  className={user.auth_provider === "google" ? "cursor-not-allowed bg-gray-200 dark:bg-gray-200/50 border px-5 py-2 rounded-xl text-black pr-10 w-full" : "border px-5 py-2 rounded-xl pr-10 w-full"}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer flex items-center justify-center"
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </span>
              </div>
            </div>

            <div className="flex flex-col w-full relative">
              <label htmlFor="newPassword" className="text-md font-semibold p-1">NEW PASSWORD</label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showNew ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={user.auth_provider === "google"}
                  className={user.auth_provider === "google" ? "cursor-not-allowed bg-gray-200 dark:bg-gray-200/50 border px-5 py-2 rounded-xl text-black pr-10 w-full" : "border px-5 py-2 rounded-xl pr-10 w-full"}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer flex items-center justify-center"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </span>
              </div>
            </div>

            <div className="flex flex-col w-full relative">
              <label htmlFor="confirmNewPassword" className="text-md font-semibold p-1">CONFIRM NEW PASSWORD</label>
              <div className="relative">
                <input
                  id="confirmNewPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  disabled={user.auth_provider === "google"}
                  className={user.auth_provider === "google" ? "cursor-not-allowed bg-gray-200 dark:bg-gray-200/50 border px-5 py-2 rounded-xl text-black pr-10 w-full" : "border px-5 py-2 rounded-xl pr-10 w-full"}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer flex items-center justify-center"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </span>
              </div>
            </div>
          </div>
        </div>

        {user.auth_provider === "google" && (
          <p className="px-10 pb-5 text-sm text-gray-500">Accounts created using Google cannot change password</p>
        )}

        <div className="px-10 pb-10">
          <Button
            onClick={handleSaveChanges}
            disabled={user.auth_provider === "google"}
            className={user.auth_provider === "google" ? "cursor-not-allowed px-5 py-5 font-semibold text-white bg-purple-500" : "cursor-pointer px-5 py-5 font-semibold text-white bg-purple-500 hover:bg-purple-600"}
          >
            Update Password
          </Button>
        </div>
      </div>

      <div className="px-1 py-10">
        <Button
          className="cursor-pointer"
          variant={"destructive"}
          onClick={() => setShowDeleteModal(true)}
        >
          Delete Account
        </Button>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-gray-100/50 dark:bg-gray-600/20 rounded-xl p-6 max-w-md space-y-4 shadow-xl">
            <h2 className="text-lg font-semibold text-red-600">Confirm Delete</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              This action is permanent. Type <strong>delete</strong> to confirm account deletion.
            </p>
            <input
              type="text"
              placeholder="Type 'delete' to confirm"
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => { setShowDeleteModal(false); setConfirmText(""); }}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={confirmText !== "delete"}
                className={confirmText === "delete" ? "" : "opacity-50 cursor-not-allowed"}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
