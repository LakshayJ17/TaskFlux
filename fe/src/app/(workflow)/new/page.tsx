import Header from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconRobotFace } from "@tabler/icons-react";
import { ArrowRight, Crown, MessageSquare, Mic, Plus, Stars, WorkflowIcon, Move, Settings, GitBranch, BookOpenCheck } from "lucide-react";

export default function New() {
    return (
        <div className="w-full min-h-screen">
            <Header />
            <div className="w-full flex-col flex items-center justify-center bg-white dark:bg-black px-4">
                <div className="flex flex-col items-center w-full md:w-1/2 text-center mt-10">
                    <h1 className="text-4xl font-bold">Create New WorkFlow</h1>
                    <p className="text-center mt-2">
                        Choose how you&apos;d like to build your workflow. Create manually with
                        full control, or let FluxBot AI help you build it faster.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row w-full md:w-2/3 mt-10 gap-10">
                    {/* Manual Workflow */}
                    <div className="basis-1/2 border rounded-xl p-8 hover:shadow-xl transition-all">
                        <div className="flex space-x-3 items-start">
                            <WorkflowIcon className="border size-10 p-2 rounded-xl shrink-0" />
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

                        <div className="mt-6 bg-gradient-to-br from-emerald-400/80 via-emerald-700/80 to-emerald-600/80 rounded-lg p-5 space-y-3">
                            <div className="flex justify-between">
                                <p className="text-white">Free Plan</p>
                                <Badge className="bg-emerald-500 py-1.5 text-white w-24 text-center">
                                    2 workflows
                                </Badge>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-white">Plus Plan</p>
                                <Badge className="bg-gradient-to-r py-1.5 from-emerald-500 to-purple-500 w-24 text-center">
                                    Unlimited
                                </Badge>
                            </div>

                            <div className="flex items-center gap-2 text-yellow-400 text-sm pt-2">
                                <Crown className="size-4" /> Upgrade to Plus for unlimited workflows
                            </div>
                        </div>

                        <Button
                            size={"lg"}
                            className="flex justify-center gap-2 items-center rounded-xl py-6 w-full mt-5 cursor-pointer bg-gradient-to-br from-emerald-400/90 via-emerald-700/90 to-emerald-600/90 hover:from-emerald-400 hover:via-emerald-700 hover:to-emerald-600"
                        >
                            <Plus />
                            Create Manual Workflow
                            <ArrowRight />
                        </Button>
                    </div>

                    {/* FluxBot AI */}
                    <div className="basis-1/2 border rounded-xl p-8 hover:shadow-xl transition-all">
                        <div className="flex space-x-3 items-start">
                            <WorkflowIcon className="border size-10 p-2 rounded-xl shrink-0" />
                            <div className="flex flex-col space-y-1">
                                <div className="flex items-center gap-2 font-semibold text-xl">
                                    FluxBot AI
                                    <Badge className="gap-1 bg-yellow-500/90 text-black">
                                        <Crown className="size-4" />
                                        Premium
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

                        <div className="mt-6 bg-gradient-to-br from-purple-400 via-purple-700 to-purple-600 rounded-lg p-5 space-y-3">
                            <div className="flex justify-between">
                                <p className="text-white">Free Plan</p>
                                <Badge className="bg-emerald-500 py-1.5 text-white w-24 text-center">
                                    1 workflow
                                </Badge>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-white">Plus Plan</p>
                                <Badge className="bg-gradient-to-r py-1.5 from-emerald-500 to-purple-500 w-24 text-center">
                                    Unlimited
                                </Badge>
                            </div>

                            <div className="flex items-center gap-2 text-yellow-400 text-sm pt-2">
                                <Crown className="size-4" /> Upgrade to Plus for unlimited AI workflows
                            </div>
                        </div>

                        <Button
                            size={"lg"}
                            className="flex justify-center gap-2 items-center rounded-xl py-6 w-full mt-5 cursor-pointer bg-gradient-to-br from-purple-400/90 via-purple-700/90 to-purple-600/90 hover:from-purple-400 hover:via-purple-700 hover:to-purple-600"
                        >
                            <MessageSquare />
                            Chat with FluxBot
                            <ArrowRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
