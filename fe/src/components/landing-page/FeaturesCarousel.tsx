"use client";

import Carousel from "../ui/carousel";

export default function FeaturesCarousel() {
  const slideData = [
    {
      title: "Drag And Drop - Easy to Use",
      // button: "Explore Component",
      src: "./dragndrop.png",
    },
    {
      title: "Connect 500+ Apps",
      // button: "Explore Component",
      src: "./app-integrations.png",
    },
    {
      title: "FluxBot AI to ease things",
      // button: "Explore Component",
      src: "./fluxbot-time.png",
    },
    {
      title: "Desert Whispers",
      // button: "Explore Component",
      src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}
