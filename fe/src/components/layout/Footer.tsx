import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Image width={40} height={40} className="rounded-sm" src="/taskflux-logo.png" alt="tf-logo" />
                            <span className="text-xl font-semibold">TaskFlux</span>
                        </div>
                        <p className="text-gray-400">The free and open-source workflow automation platform.</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Product</h3>
                        <div className="space-y-2 text-gray-400">
                            <Link href="#" className="block hover:text-emerald-400 transition-colors">
                                Features
                            </Link>
                            <Link href="#" className="block hover:text-emerald-400 transition-colors">
                                Integrations
                            </Link>
                            <Link href="#" className="block hover:text-emerald-400 transition-colors">
                                Documentation
                            </Link>
                            <Link href="#" className="block hover:text-emerald-400 transition-colors">
                                API
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <div className="space-y-2 text-gray-400">
                            <Link href="#" className="block hover:text-emerald-400 transition-colors">
                                About
                            </Link>
                            <Link href="#" className="block hover:text-emerald-400 transition-colors">
                                Blog
                            </Link>
                            <Link href="#" className="block hover:text-emerald-400 transition-colors">
                                Careers
                            </Link>
                            <Link href="#" className="block hover:text-emerald-400 transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Community</h3>
                        <div className="space-y-2 text-gray-400">
                            <Link href="#" className="block hover:text-emerald-400 transition-colors">
                                GitHub
                            </Link>
                            <Link href="#" className="block hover:text-emerald-400 transition-colors">
                                Discord
                            </Link>
                            <Link href="#" className="block hover:text-emerald-400 transition-colors">
                                Twitter
                            </Link>
                            <Link href="#" className="block hover:text-emerald-400 transition-colors">
                                Forum
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} TaskFlux. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
