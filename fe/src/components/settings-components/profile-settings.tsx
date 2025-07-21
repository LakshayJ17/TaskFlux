import { useCurrentUser } from "@/hooks/useCurrentUser"

export default function ProfileSettings(){
    const {user, loading, error} = useCurrentUser();

    return (
        <div>
            <div className="dark:text-white">
                hi
            </div>
        </div>
    )
}