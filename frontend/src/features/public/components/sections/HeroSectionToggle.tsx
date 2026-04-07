"use client";

import React, { useState } from "react";
import Hero from "./Hero";
import HeroB from "./HeroB";
import { HeroData } from "@/data/heroData";

export default function HeroSectionToggle({ data }: { data: HeroData }) {
  // We'll set the initial state to 'B' so the user can immediately see the new feature upon load.
  const [heroVersion, setHeroVersion] = useState<"A" | "B">("B");

  // Sync version with header
  React.useEffect(() => {
    window.dispatchEvent(new CustomEvent("hero-version-change", { detail: heroVersion }));
  }, [heroVersion]);

  return (
    <div className="relative w-full z-10">
      {/* Dev Toggle */}
      <div className="absolute top-28 w-[fit-content] right-4 md:top-28 md:right-8 z-[1000] flex items-center bg-black/80 backdrop-blur-md rounded-full shadow-lg overflow-hidden border border-white/20 p-1">
        <button
          onClick={() => setHeroVersion("A")}
          className={`px-4 py-1.5 md:px-6 md:py-2 text-[10px] md:text-xs font-bold transition-all rounded-full cursor-pointer ${heroVersion === "A" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-white/50 hover:text-white"}`}
        >
          Version A (Carousel)
        </button>
        <button
          onClick={() => setHeroVersion("B")}
          className={`px-4 py-1.5 md:px-6 md:py-2 text-[10px] md:text-xs font-bold transition-all rounded-full cursor-pointer ${heroVersion === "B" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-white/50 hover:text-white"}`}
        >
          Version B (Video)
        </button>
      </div>

      <div className="w-full h-full">
        {heroVersion === "A" ? <Hero data={data.versionA} /> : <HeroB data={data.versionB} />}
      </div>
    </div>
  );
}