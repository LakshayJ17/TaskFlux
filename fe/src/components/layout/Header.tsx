"use client"

import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react"
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Header() {
    const router = useRouter();

    return (
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50 px-6 py-6 min-w-full">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-violet-500 rounded-lg flex items-center justify-center">
                        <Zap className="h-5 w-5 text-white" />
                    </div>
                    <Link href={'/'}
                        className="text-3xl font-semibold bg-gradient-to-r from-emerald-600 to-violet-600 bg-clip-text text-transparent">
                        TaskFlux
                    </Link>
                </div>

                <nav className="hidden md:flex items-center space-x-8">
                    <Link href="#features" className="text-gray-600 hover:text-emerald-600 transition-colors">
                        Features
                    </Link>
                    <Link href="#integrations" className="text-gray-600 hover:text-emerald-600 transition-colors">
                        Integrations
                    </Link>
                    <Link href="#demo" className="text-gray-600 hover:text-emerald-600 transition-colors">
                        Demo
                    </Link>
                    <Link href="/pricing" className="text-gray-600 hover:text-emerald-600 transition-colors">
                        Pricing
                    </Link>
                </nav>
                <div className="space-x-5">
                    <Button onClick={() => router.push('/signin')} variant="outline" size={"lg"} className="border-emerald-200 hover:bg-emerald-50 bg-transparent">
                        Sign In
                    </Button>
                    <Button
                        onClick={() => router.push('/signup')}
                        size={"lg"}
                        className="bg-violet-500 hover:bg-violet-600"
                    >
                        Get Started
                    </Button>
                </div>
            </div>
        </header>
    );
}