"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Gift, Shield, Zap } from "lucide-react";
import Header from "../../components/layout/Header";
import { useRouter } from "next/navigation";
import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from "@/components/ui/accordion";


export default function PricingSection() {
    const router = useRouter();

    return (
        <div className="animate-fade-in delay-200">
            <Header />
            <section className="flex justify-center items-center flex-col py-10 px-6 bg-white dark:bg-black animate-fade-in delay-200">

                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Choose Your AI Power</h2>
                        <p className="text-xl text-gray-600 max-w-3xl dark:text-white mx-auto">
                            Flexible options to fit your needs. Start free and scale as you grow.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Free */}
                        <Card className="relative overflow-hidden border-2 border-emerald-200 transform hover:scale-105 transition-all duration-300 animate-fade-in delay-200">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500"></div>
                            <CardContent className="p-8">
                                <div className="text-center mb-6">
                                    <Gift className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 dark:text-emerald-400">Free Forever</h3>
                                    <p className="text-gray-600">Perfect for getting started</p>
                                </div>
                                <div className="text-center mb-6">
                                    <div className="flex justify-center items-center-safe space-x-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-indian-rupee-icon lucide-indian-rupee"><path d="M6 3h12" /><path d="M6 8h12" /><path d="m6 13 8.5 8" /><path d="M6 13h3" /><path d="M9 13c6.667 0 6.667-10 0-10" /></svg>
                                        <div className="text-4xl font-bold text-gray-900 mb-2 dark:text-white">0</div>
                                    </div>
                                    <div className="text-gray-600 dark:text-purple-500">Forever</div>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                                        <span>5 Free workflows</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                                        <span>Free Gemini AI integration</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                                        <span>Bring your own OpenAI key</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                                        <span>Community support</span>
                                    </li>
                                </ul>
                                <Button onClick={() => router.push('/signup')} className="w-full cursor-hover bg-emerald-500 hover:bg-emerald-600">Get Started Free</Button>
                            </CardContent>
                        </Card>

                        {/* Pro Plan */}
                        <Card className="relative overflow-hidden border-2 border-violet-200 transform hover:scale-105 transition-all duration-300 animate-fade-in delay-400">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500"></div>
                            <div className="absolute top-4 right-4 bg-violet-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Popular
                            </div>
                            <CardContent className="p-8">
                                <div className="text-center mb-6">
                                    <Zap className="h-12 w-12 text-violet-500 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 dark:text-purple-400">Plus</h3>
                                    <p className="text-gray-600">We provide the AI power</p>
                                </div>
                                <div className="text-center mb-6">
                                    <div className="flex justify-center items-center-safe space-x-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-indian-rupee-icon lucide-indian-rupee"><path d="M6 3h12" /><path d="M6 8h12" /><path d="m6 13 8.5 8" /><path d="M6 13h3" /><path d="M9 13c6.667 0 6.667-10 0-10" /></svg>
                                        <div className="text-4xl font-bold text-gray-900 mb-2 dark:text-white">10000</div>
                                    </div>
                                    <div className="text-gray-600 dark:text-purple-500">Validity : Lifetime</div>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-violet-500 mr-3" />
                                        <span>Everything in Free</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-violet-500 mr-3" />
                                        <span>Unlimited Workflows</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-violet-500 mr-3" />
                                        <span>AI Workflow Maker</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-violet-500 mr-3" />
                                        <span>Priority support</span>
                                    </li>
                                </ul>
                                <Button className="w-full cursor-hover bg-violet-500 hover:bg-violet-600">Upgrade to Plus</Button>
                            </CardContent>
                        </Card>

                        {/* Enterprise Plan */}
                        <Card className="relative overflow-hidden border-2 border-gray-200 transform hover:scale-105 transition-all duration-300 animate-fade-in delay-600">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-500 to-gray-700"></div>
                            <CardContent className="p-8">
                                <div className="text-center mb-6">
                                    <Shield className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">Enterprise</h3>
                                    <p className="text-gray-600">For large organizations</p>
                                </div>
                                <div className="text-center mb-6">
                                    <div className="text-4xl font-bold text-gray-900 mb-2 dark:text-white">Custom</div>
                                    <div className="text-gray-600 dark:text-purple-500">Volume pricing</div>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-gray-500 mr-3" />
                                        <span>Everything in Pro</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-gray-500 mr-3" />
                                        <span>Custom AI models</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-gray-500 mr-3" />
                                        <span>Dedicated support</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-gray-500 mr-3" />
                                        <span>SLA guarantees</span>
                                    </li>
                                </ul>
                                <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50 bg-transparent">
                                    Contact Sales
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* API Key Options */}
                    {/* <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 animate-fade-in delay-800">
                        <div className="text-center mb-8">
                            <Key className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Integration Options</h3>
                            <p className="text-gray-600">Choose how you want to power your AI workflows</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="text-center p-6 bg-emerald-50 rounded-xl">
                                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Key className="h-8 w-8 text-white" />
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">Bring Your Own Key</h4>
                                <p className="text-gray-600 mb-4">
                                    Use your own OpenAI API key for maximum control and transparency. Perfect for developers and power
                                    users.
                                </p>
                                <Badge className="bg-emerald-100 text-emerald-700">Free Forever</Badge>
                            </div>

                            <div className="text-center p-6 bg-violet-50 rounded-xl">
                                <div className="w-16 h-16 bg-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CreditCard className="h-8 w-8 text-white" />
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">Pay-as-you-Go</h4>
                                <p className="text-gray-600 mb-4">
                                    We handle the API keys and billing. Just focus on building amazing workflows. Simple, transparent
                                    pricing.
                                </p>
                                <Badge className="bg-violet-100 text-violet-700">₹ 20 per operation</Badge>
                            </div>
                        </div>
                    </div> */}


                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is it accessible?</AccordionTrigger>
                            <AccordionContent>
                                Yes. It adheres to the WAI-ARIA design pattern.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>


                </div>
            </section>
        </div>
    )
}