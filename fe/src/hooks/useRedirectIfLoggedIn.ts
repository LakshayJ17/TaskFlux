import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { getCurrentUser } from "@/utils/getUser";

export function useRedirectIfLoggedIn() {
    const router = useRouter();

    useEffect(() => {
        const check = async () => {
            const user = await getCurrentUser()

            if (user) {
                router.replace('/dashboard')
            }
        }
        check()
    }, [])
}