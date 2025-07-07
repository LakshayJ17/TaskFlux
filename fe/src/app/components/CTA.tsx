import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";

interface CTASectionProps {
    email : string;
    setEmail: (email: string) => void;
}

export default function CTASection({ email, setEmail } : CTASectionProps) {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-emerald-500 to-violet-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:24px_24px] animate-pulse-slow"></div>

      <div className="container mx-auto max-w-4xl text-center text-white relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
          Ready to automate with AI intelligence?
        </h2>
        <p className="text-xl mb-8 opacity-90 animate-fade-in delay-200">
          Join thousands of individuals & businesses already saving time and money with AI-powered automation
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto animate-fade-in delay-400">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/20 backdrop-blur-sm text-white placeholder:text-white/70 border-white/30 transform hover:scale-105 transition-all duration-300"
          />
          <Button
            size="lg"
            variant="secondary"
            className="whitespace-nowrap bg-white text-emerald-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Free Today
          </Button>
        </div>

        <div className="flex items-center justify-center space-x-6 mt-8 text-sm opacity-75 animate-fade-in delay-600">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>Free Gemini AI included</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>Setup in 2 minutes</span>
          </div>
        </div>
      </div>
    </section>
  )
}