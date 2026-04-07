"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wine, ChefHat, Soup, Thermometer, ChevronLeft, ChevronRight } from "lucide-react";

import { CategoryData } from "@/data/categoriesData";

// Add a helper mapping for icons
const IconMap: Record<string, React.ReactNode> = {
  "Wine": <Wine size={20} />,
  "ChefHat": <ChefHat size={20} />,
  "Soup": <Soup size={20} />,
  "Thermometer": <Thermometer size={20} />
};

const CategoryStrip = ({ categories }: { categories: CategoryData[] }) => {
  return (
    <section className="relative z-30 -mt-24 md:-mt-32 lg:-mt-60 mb-12">
      <div className="container mx-auto px-4 md:px-6">

        {/* Main Floating Container */}
        <div className="relative bg-[#F9F3EE] rounded-[2rem] md:rounded-[3.5rem] p-4 md:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50">

          {/* Navigation Controls (Left/Right Buttons) */}
          <div className="absolute inset-y-0 -left-4 md:-left-8 flex items-center z-10">
            <button className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white shadow-xl border border-neutral-100 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all active:scale-95">
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute inset-y-0 -right-4 md:-right-8 flex items-center z-10">
            <button className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white shadow-xl border border-neutral-100 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all active:scale-95">
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Grid Content: Horizontal Scroll on Mobile, Grid on Desktop */}
          <div className="flex md:grid md:grid-cols-4 gap-3 md:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide snap-x snap-mandatory scroll-content-padding">
            {categories.map((category, i) => (
              <motion.a
                key={category.id}
                href={`#${category.id}`}
                whileHover={{ y: -8 }}
                className="group relative aspect-[3/4] min-w-[160px] md:min-w-0 md:w-auto rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-md flex-shrink-0 snap-start"
              >
                {/* Background Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors" />

                {/* Vertical Pill Label (Similar to screenshot style) */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-2 md:gap-3 bg-white/20 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/30 transform transition-transform group-hover:scale-105">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] md:text-sm">
                      {IconMap[category.iconName] || <ChefHat size={20} />}
                    </div>
                    <span className="text-white font-bold text-[8px] md:text-[10px] tracking-widest uppercase truncate max-w-[60px] md:max-w-none">
                      {category.name}
                    </span>
                  </div>
                </div>

                {/* Glow/Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CategoryStrip;