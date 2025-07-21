import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

export default function AppearanceSettings() {
    const { theme, setTheme } = useTheme();
    return (
        <div className="border rounded-t-xl">
            <div>
                <div className="border-b p-5">
                    <div className="flex items-center font-semibold space-x-3">
                        <Sun />
                        <h1 className="text-xl pb-1">Theme Preferences</h1>
                    </div>

                    <p className="pl-9">Customize how the interface looks and feels across all devices.</p>
                </div>

                <div className="flex justify-around p-5">
                    <button
                        className={`px-4 py-2 rounded ${theme === "light" ? "bg-emerald-200 font-bold" : ""}`}
                        onClick={() => setTheme("light")}
                    >
                        <Sun className="inline mr-2" /> Light
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${theme === "dark" ? "bg-emerald-200 font-bold" : ""}`}
                        onClick={() => setTheme("dark")}
                    >
                        <Moon className="inline mr-2" /> Dark
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${theme === "system" ? "bg-emerald-200 font-bold" : ""}`}
                        onClick={() => setTheme("system")}
                    >
                        <Monitor className="inline mr-2" /> System
                    </button>
                </div>
            </div>
        </div>
    )
}