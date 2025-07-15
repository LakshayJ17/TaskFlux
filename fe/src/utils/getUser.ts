import axios from "axios";

export async function getCurrentUser() {
    try {
        const token = localStorage.getItem("token")

        if (!token) return null;

        const res = await axios.get("http://127.0.0.1:8000/api/v1/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data;

    } catch (error) {
        console.error("❌ Failed to fetch current user", error);
        return null;
    }
}