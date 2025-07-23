"use client"

import Header from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoaderFour } from "@/components/ui/loader";
import { useAuthIfNotLoggedIn } from "@/hooks/useAuthIfNotLoggedIn";
import { IconRobotFace } from "@tabler/icons-react";
import { ArrowRight, Crown, MessageSquare, Mic, Plus, Stars, WorkflowIcon, Move, Settings, GitBranch, BookOpenCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function New() {
    const { user, loading, error } = useAuthIfNotLoggedIn();
    const router = useRouter();

    if (loading) return (
        <div className="flex items-center justify-center h-[100vh] w-full">
            <LoaderFour />
        </div>
    );
    if (error) return <div>Error loading user</div>;
    if (!user) return null;

    return (
        <div className="w-full min-h-screen relative bg-white dark:bg-black">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:75px_75px]"></div>
            </div>
            <Header />
            <div className="w-full flex-col flex items-center justify-center px-4 py-4 md:py-10">
                <div className="animate-fade-in delay-400 flex flex-col items-center w-full md:w-1/2 text-center">
                    <h1 className="pb-4 sm:pb-0 text-3xl sm:text-5xl font-bold">Create New WorkFlow</h1>
                    <p className="text-md sm:text-lg text-center mt-2">
                        Choose how you&apos;d like to build your workflow.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row w-full md:w-2/3 mt-5 gap-10">
                    <div className="animate-fade-in delay-400 relative basis-1/2 border rounded-xl p-8 bg-white dark:bg-black hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-emerald-500/20 transition-all">
                        <div className="flex space-x-3 items-center">
                            <WorkflowIcon className="border size-11 p-2 rounded-xl shrink-0" />
                            <div className="flex flex-col space-y-1">
                                <div className="font-semibold text-xl">Manual Workflow</div>
                                <div className="text-sm text-gray-500 dark:text-gray-300">
                                    Build workflows step-by-step with full control
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2 mt-5 text-sm">
                            <div className="flex items-center gap-2">
                                <Move className="text-emerald-500 size-4" />
                                Drag & drop workflow builder
                            </div>
                            <div className="flex items-center gap-2">
                                <Settings className="text-emerald-500 size-4" />
                                Custom triggers and actions
                            </div>
                            <div className="flex items-center gap-2">
                                <GitBranch className="text-emerald-500 size-4" />
                                Advanced conditional logic
                            </div>
                            <div className="flex items-center gap-2">
                                <BookOpenCheck className="text-emerald-500 size-4" />
                                Template library access
                            </div>
                        </div>

                        {user.is_premium ?
                            <div className="mt-6 border-2 bg-gray-950/80 rounded-lg p-5 space-y-3">
                                <div className="flex items-center gap-2 text-yellow-400 text-sm">
                                    <Crown className="size-4" /> Unlimited Workflows unlocked
                                </div>
                            </div>

                            :
                            <div className="mt-6 border-2 bg-gray-950/80 rounded-lg p-5 space-y-3">
                                <div className="flex justify-between">
                                    <p className="text-white">Free Plan</p>
                                    <Badge className="bg-purple-500 py-1.5 text-white w-26 text-center">
                                        {2 - user.manual_workflow_count}{(2 - user.manual_workflow_count) === 1 ? <p>workflow left</p> : <p>workflows left</p>}
                                    </Badge>
                                </div>
                                {/* <div className="flex justify-between">
                                    <p className="text-white">Plus Plan</p>
                                    <Badge className="bg-gradient-to-r py-1.5 from-emerald-500 to-purple-500 w-24 text-center border-emerald-600/80">
                                        Unlimited
                                    </Badge>
                                </div> */}

                                <div className="flex items-center gap-2 text-yellow-400 text-sm pt-2">
                                    <Crown className="size-4" /> Upgrade to Plus for unlimited workflows
                                </div>
                            </div>
                        }

                        {!user.is_premium && user.manual_workflow_count == 2 ?
                            <Button
                                onClick={() => router.push('/pricing')}
                                size={"lg"}
                                className="flex justify-center gap-2 items-center rounded-xl py-6 w-full mt-5 cursor-pointer bg-yellow-400"
                            >
                                <Crown />
                                Upgrade to Premium to continue
                                <ArrowRight />
                            </Button>
                            :
                            <Button
                                size={"lg"}
                                className="flex justify-center gap-2 items-center rounded-xl py-6 w-full mt-5 cursor-pointer bg-gradient-to-br from-emerald-400/90 via-emerald-700/90 to-emerald-600/90 hover:from-emerald-400 hover:via-emerald-700 hover:to-emerald-600 text-white"
                            >
                                <Plus />
                                Create Manual Workflow
                                <ArrowRight />
                            </Button>
                        }

                    </div>


                    <div className="animate-fade-in delay-400 relative basis-1/2 border rounded-xl p-8 bg-white dark:bg-black hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-purple-500/20 transition-all">
                        <div className="flex space-x-3 items-center">
                            <Image width={40} height={40} src="/fluxbot-closeup.png" alt="Fluxbot" className="rounded-xl" />
                            <div className="flex flex-col space-y-1">
                                <div className="flex items-center gap-2 font-semibold text-xl">
                                    FluxBot AI
                                    <Badge className="gap-1 bg-yellow-500/90 text-black">
                                        <Crown className="size-4" />
                                        Plus
                                    </Badge>
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-300">
                                    Let AI build your workflow through conversation
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2 mt-5 text-sm">
                            <div className="flex items-center gap-2">
                                <IconRobotFace className="text-purple-500 size-4" />
                                Instant workflow generation
                            </div>
                            <div className="flex items-center gap-2">
                                <Mic className="text-purple-500 size-4" />
                                Voice commands support
                            </div>
                            <div className="flex items-center gap-2">
                                <MessageSquare className="text-purple-500 size-4" />
                                Natural language workflow creation
                            </div>
                            <div className="flex items-center gap-2">
                                <Stars className="text-purple-500 size-4" />
                                Smart optimization suggestions
                            </div>
                        </div>

                        {user.is_premium ?
                            <div className="mt-6 border-2 bg-gray-950/80 rounded-lg p-5 space-y-3">
                                <div className="flex items-center gap-2 text-yellow-400 text-sm">
                                    <Crown className="size-4" /> Unlimited AI Workflows unlocked
                                </div>
                            </div>
                            :
                            <div className="mt-6 border-2 bg-gray-950/80 rounded-lg p-5 space-y-3">
                                <div className="flex justify-between">
                                    <p className="text-white">Free Plan</p>
                                    <Badge className="bg-emerald-500 py-1.5 text-white w-26 text-center">
                                        {1 - user.ai_workflow_count} {(1 - user.ai_workflow_count) === 1 ? "workflow left" : "workflows left"}
                                    </Badge>
                                </div>
                                {/* <div className="flex justify-between">
                                    <p className="text-white">Plus Plan</p>
                                    <Badge className="bg-gradient-to-r py-1.5 from-emerald-500 to-purple-500 w-24 text-center border-purple-600/80">
                                        Unlimited
                                    </Badge>
                                </div> */}

                                <div className="flex items-center gap-2 text-yellow-400 text-sm pt-2">
                                    <Crown className="size-4" /> Upgrade to Plus for unlimited AI workflows
                                </div>
                            </div>
                        }

                        {!user.is_premium && user.ai_workflow_count == 1 ?
                            <Button
                                onClick={() => router.push('/pricing')}
                                size={"lg"}
                                className="flex justify-center gap-2 items-center rounded-xl py-6 w-full mt-5 cursor-pointer bg-yellow-400"
                            >
                                <Crown />
                                Upgrade to Premium to continue
                                <ArrowRight />
                            </Button>
                            :
                            <Button
                                size={"lg"}
                                className="flex justify-center gap-2 items-center rounded-xl py-6 w-full mt-5 cursor-pointer bg-gradient-to-br from-purple-400/90 via-purple-700/90 to-purple-600/90 hover:from-purple-400 hover:via-purple-700 hover:to-purple-600 text-white hover:ring:text-emerald-800"
                            >
                                <MessageSquare />
                                Chat with FluxBot
                                <ArrowRight />
                            </Button>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}
