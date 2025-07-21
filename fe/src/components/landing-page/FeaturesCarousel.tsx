import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  bgGradient: string;
  image: string;
}

interface FeaturesCarouselProps {
  features: Feature[];
  currentSlide: number;
  prevSlide: () => void;
  nextSlide: () => void;
  goToSlide: (index: number) => void;
}

const FeaturesCarousel: React.FC<FeaturesCarouselProps> = ({
  features,
  currentSlide,
  prevSlide,
  nextSlide,
  goToSlide,
}) => {
  return (
    <section id="features" className="py-20 px-6 bg-white dark:bg-black">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-[#FCFFFF] mb-4">Powerful AI-Driven Features</h2>
          <p className="text-xl text-gray-600 dark:text-[#99E1D9] max-w-2xl mx-auto">
            Everything you need to build, deploy, and manage sophisticated AI-powered automation workflows
          </p>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out py-10"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {features.map((feature, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card
                    className={`mx-auto max-w-5xl bg-gradient-to-br ${feature.bgGradient} dark:from-[#202C39] dark:to-[#99E1D9] border-0 overflow-hidden transform hover:scale-[1.02] transition-all duration-500`}
                  >
                    <CardContent className="p-12">
                      <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-center md:text-left">
                          <div
                            className={`inline-flex w-20 h-20 bg-gradient-to-r ${feature.gradient} dark:from-[#99E1D9] dark:to-[#202C39] rounded-3xl items-center justify-center text-white mb-8 animate-pulse-slow`}
                          >
                            {feature.icon}
                          </div>
                          <h3 className="text-3xl font-bold text-gray-900 dark:text-[#FCFFFF] mb-6 animate-fade-in">{feature.title}</h3>
                          <p className="text-lg text-gray-700 dark:text-[#99E1D9] leading-relaxed animate-fade-in delay-200">
                            {feature.description}
                          </p>
                        </div>
                        <div className="relative animate-fade-in delay-400">
                          <div className="w-full h-64 bg-white/50 dark:bg-[#202C39]/50 backdrop-blur-sm rounded-2xl flex items-center justify-center transform hover:scale-105 transition-all duration-300">

                            <Image
                              src={feature.image}
                              alt={feature.title}
                              width={500}
                              height={500}
                              className="w-full h-full object-cover rounded-2xl opacity-80"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-[#202C39] rounded-full flex items-center justify-center text-gray-600 dark:text-[#99E1D9] hover:text-emerald-600 transition-all duration-300 z-10 transform hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-[#202C39] rounded-full flex items-center justify-center text-gray-600 dark:text-[#99E1D9] hover:text-emerald-600 transition-all duration-300 z-10 transform hover:scale-110"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="flex justify-center mt-8 space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${index === currentSlide
                  ? "bg-gradient-to-r from-emerald-500 to-violet-500 dark:from-[#99E1D9] dark:to-[#202C39] scale-125"
                  : "bg-gray-300 dark:bg-[#99E1D9] hover:bg-gray-400 dark:hover:bg-[#FCFFFF]"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesCarousel;
