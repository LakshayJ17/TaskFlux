import { Button } from "@/components/ui/button";
import { Play, PlayCircle } from "lucide-react";


export default function VideoDemo() {
  return (
    <section id="demo" className="py-20 px-6 bg-gradient-to-br from-emerald-50 to-violet-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">See Workflow Automation in Action</h2>
          <p className="text-sm md:text-xl text-gray-600 max-w-5xl mx-auto">
            Watch how TaskFlux empowers you to connect your apps, automate tasks, and orchestrate powerful workflows - no code required.
          </p>
        </div>

        <div className="max-w-4xl mx-auto animate-fade-in delay-300">
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            <div className="aspect-video bg-gradient-to-br from-emerald-500 to-violet-500 flex items-center justify-center relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-violet-500/20"></div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <PlayCircle className="h-10 w-10 text-emerald-500" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">Visual Workflow Automation Demo</h3>
                <p className="text-white/80">See how to build and run automations in minutes</p>
              </div>

              <iframe
                className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="TaskFlux Workflow Automation Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="p-6 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">From Idea to Automation</h4>
                  <p className="text-gray-600 text-sm">Design, connect, and deploy workflows for any use case</p>
                </div>
                <Button className="bg-gradient-to-r from-emerald-500 to-violet-500 hover:from-emerald-600 hover:to-violet-600 transform hover:scale-105 transition-all duration-300">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Workflow Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}