"use client";
import { motion } from "framer-motion";
import { Camera, Clapperboard, ArrowRight } from "lucide-react";
import { SocialAccount } from "@/data/socialsData";

export default function SocialsSection({ data }: { data: SocialAccount[] }) {
  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Camera size={26} />;
      case "tiktok":
        return <Clapperboard size={24} />;
      default:
        return <Camera size={26} />;
    }
  };

  const getIconBg = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500";
      case "tiktok":
        return "bg-black";
      default:
        return "bg-gray-800";
    }
  };

  return (
    <section className="py-12 md:py-24 bg-[#F9F9F9] w-full">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 lg:px-24">
        
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-secondary mb-4 tracking-tight">Join Our Community</h2>
          <p className="text-gray-500 font-medium tracking-wide">Stay connected for daily inspiration and recipes.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {data.map((account, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row gap-8 items-center"
            >
              {/* Left Info */}
              <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start w-full">
                <div className={`w-14 h-14 ${getIconBg(account.platform)} rounded-full flex items-center justify-center mb-6 text-white shadow-md`}>
                  {getIcon(account.platform)}
                </div>
                <h3 className="text-2xl font-serif text-secondary mb-1">{account.platform}</h3>
                <p className="text-primary font-medium text-sm mb-4">{account.username}</p>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                  {account.description}
                </p>
                
                <button className="flex items-center gap-2 font-bold text-sm text-secondary hover:text-primary transition-colors group">
                  Follow Us
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Right Images */}
              <div className="flex-1 grid grid-cols-2 gap-3 w-full">
                {account.images.map((img, i) => (
                  <div key={i} className={`aspect-${account.platform.toLowerCase() === 'tiktok' ? '[4/5]' : 'square'} bg-gray-200 rounded-2xl overflow-hidden relative group`}>
                    <img src={img} alt={`${account.platform} image`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}