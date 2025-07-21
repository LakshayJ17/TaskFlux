import { CheckCircle, Gift } from "lucide-react";


export default function FreeSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-emerald-500 via-green-500 to-violet-500 dark:bg-gradient-to-r dark:from-emerald-900 dark:via-purple-900 dark:to-purple-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 dark:bg-emerald-900/10 rounded-full animate-float"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 dark:bg-purple-900/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 dark:bg-emerald-900/10 rounded-full animate-float"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white/10 dark:bg-purple-900/10 rounded-full animate-float-delayed"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center text-white dark:text-emerald-200">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 dark:bg-purple-900/20 backdrop-blur-sm rounded-full mb-8 animate-bounce-slow">
            <Gift className="h-12 w-12 text-white dark:text-emerald-200" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up dark:text-purple-200">
            100% Free Core Platform
            <span className="block text-2xl md:text-3xl font-normal opacity-90 mt-2 dark:text-emerald-300">
              Pay only for AI when you need it
            </span>
          </h2>

          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-4xl mx-auto animate-fade-in delay-200 dark:text-emerald-300">
            Our platform is completely free. You only pay for AI operations when you choose our managed AI service. Use
            your own keys or free alternatives at no cost.
          </p>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="text-center animate-fade-in delay-300">
              <div className="text-3xl md:text-4xl font-bold mb-2">∞</div>
              <div className="text-lg opacity-90">Unlimited Workflows</div>
            </div>
            <div className="text-center animate-fade-in delay-400">
              <div className="text-3xl md:text-4xl font-bold mb-2">∞</div>
              <div className="text-lg opacity-90">Unlimited Executions</div>
            </div>
            <div className="text-center animate-fade-in delay-500">
              <div className="text-3xl md:text-4xl font-bold mb-2">$0</div>
              <div className="text-lg opacity-90">Platform Cost</div>
            </div>
            <div className="text-center animate-fade-in delay-600">
              <div className="text-3xl md:text-4xl font-bold mb-2">Free</div>
              <div className="text-lg opacity-90">Gemini AI</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm opacity-90 animate-fade-in delay-700">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>No time limits</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Full feature access</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Open source</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}