"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Share2, Play, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

import { AffiliateSocialPost } from "@/data/socialsData";

interface CategoryCarouselProps {
  id: string;
  title: string;
  subtitle: string;
  items: AffiliateSocialPost[];
  themeColor?: string;
  bgColor?: string;
}

const CategoryCarouselSection: React.FC<CategoryCarouselProps> = ({ 
  id, 
  title, 
  subtitle, 
  items, 
  themeColor = "bg-primary",
  bgColor = "bg-white"
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section id={id} className={cn("py-12 md:py-24 overflow-hidden", bgColor)}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-row justify-between items-center mb-10 md:mb-16 gap-4">
          <h2 className="text-2xl md:text-5xl font-display font-black text-primary leading-tight">
            {title}
          </h2>
          <div className="flex gap-4">
            <button 
              onClick={() => scroll("left")}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm bg-white"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm bg-white"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-12 scrollbar-none no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="shrink-0 w-[280px] md:w-[320px] lg:w-[360px] snap-start group"
            >
              {/* Media Card */}
              <div className="relative aspect-[9/16] bg-neutral-900 rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                {/* Background Image / Video Cover */}
                {item.videoUrl ? (
                  <video 
                    src={item.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <img 
                    src={item.productImage} 
                    alt={item.influencer} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/assets/placeholder.png";
                    }}
                  />
                )}
                
                {/* Visual Overlays */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-black/20 flex flex-col justify-end p-6">
                  
                  {/* Side Engagement Bars (Replicating Social feel) */}
                  <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 text-white text-xs font-bold">
                    <div className="flex flex-col items-center gap-1 group/engagement cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-primary transition-colors">
                        <Heart size={20} />
                      </div>
                      <span className="drop-shadow-md">{item.likes}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 group/engagement cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-primary transition-colors">
                        <MessageCircle size={20} />
                      </div>
                      <span className="drop-shadow-md">{item.comments}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 group/engagement cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-primary transition-colors">
                        <Share2 size={20} />
                      </div>
                      <span className="drop-shadow-md">{item.shares || "2.1k"}</span>
                    </div>
                  </div>

                  {/* Middle Play UI */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                       <Play size={28} fill="currentColor" />
                    </div>
                  </div>

                  {/* Bottom Info & CTA */}
                  <div className="space-y-4">
                    {/* Influencer Tag */}
                    <a href={item.influencerLink} className="flex items-center gap-3 w-max hover:opacity-80 transition-opacity">
                      <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden bg-neutral-800 shrink-0 shadow-lg">
                        <img 
                          src={item.avatar} 
                          alt={item.influencer} 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/assets/placeholder.png";
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold text-white drop-shadow-md">{item.influencer}</span>
                    </a>

                    {/* Caption */}
                    <p className="text-xs text-white/90 leading-relaxed font-medium drop-shadow-sm line-clamp-2">
                       {item.caption || "Look at this amazing build with Omega Houseware! Perfect for modern kitchens. #OmegaHome #KitchenDesign"}
                    </p>

                    {/* Product Details & Buy Now Button (Omega Red) */}
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-3 flex flex-col gap-2">
                       <div className="flex justify-between items-start">
                         <span className="text-white font-bold text-sm leading-tight max-w-[60%]">{item.productName}</span>
                         <div className="flex flex-col items-end">
                           {item.offerPrice ? (
                             <>
                               <span className="text-white font-black text-sm text-primary">{item.offerPrice}</span>
                               <span className="text-white/50 text-[10px] line-through">{item.regularPrice}</span>
                             </>
                           ) : (
                             <span className="text-white font-black text-sm">{item.regularPrice}</span>
                           )}
                         </div>
                       </div>
                       
                       <a 
                         href={item.affiliateLink}
                         className="w-full bg-primary hover:bg-red-800 text-white rounded-lg py-3 flex items-center justify-center gap-2 font-black uppercase tracking-widest text-[10px] transition-all duration-300 shadow-xl shadow-black/20 mt-1"
                       >
                         <ShoppingBag size={14} />
                         Buy Now
                       </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarouselSection;