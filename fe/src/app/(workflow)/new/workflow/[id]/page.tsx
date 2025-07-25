"use client"
import WorkflowBuilder from "@/components/Workflow/WorkflowBuilder";
import { useAuthIfNotLoggedIn } from "@/hooks/useAuthIfNotLoggedIn";
import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

export default function ManualWorkflow(){
    const params = useParams()
    const workflowId = params.id as string;
    const {user, loading, error} = useAuthIfNotLoggedIn();
    const [workflow, setWorkflow] = useState(null)
    const [isNewWorkflow, setIsNewWorkflow] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    // useEffect(() => {
    //     const checkExistingWorkflow = async () => {
    //         try {
    //             const token = localStorage.getItem("token")
                
    //         } catch (error) {
                
    //         }
    //     }
    // }, [])

    return (
        <WorkflowBuilder />
    )
}