"use client";

import { motion, Variants } from "framer-motion";
import { societies } from "@/data/societies";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SocietiesPage() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50/50">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-[800px] h-[800px] bg-ieee-blue/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-6"
          >
            Our <span className="text-gradient">Societies</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Explore our 13 specialized student chapters driving innovation and excellence across diverse technological domains.
          </motion.p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {societies.map((society) => (
            <motion.div key={society.id} variants={item} className="h-full">
              <Link href={`/societies/${society.slug}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-ieee-blue rounded-3xl">
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="group relative h-full bg-white rounded-3xl p-8 border border-slate-200/50 hover:border-transparent transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,98,155,0.08)] overflow-hidden flex flex-col"
                >
                  {/* Subtle Gradient Hover Border Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-ieee-blue/30 via-accent-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
                  <div className="absolute inset-[1px] rounded-[calc(1.5rem-1px)] bg-white pointer-events-none -z-10" />
                  
                  {/* Soft Background Glow on Hover */}
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-gradient-to-br from-ieee-blue/5 to-accent-cyan/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Logo Container */}
                    <div className="mb-8">
                      {society.logo ? (
                        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-slate-100/80 overflow-hidden p-2 group-hover:shadow-md transition-shadow duration-300">
                          <img 
                            src={society.logo} 
                            alt={society.shortName} 
                            className="w-full h-full object-contain pointer-events-none group-hover:scale-105 transition-transform duration-500"
                            style={{ transform: society.logoRotation }}
                          />
                        </div>
                      ) : (
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-heading font-bold text-xl ${society.accentColor} shadow-sm group-hover:shadow-md transition-shadow duration-300`}>
                          {society.shortName}
                        </div>
                      )}
                    </div>
                    
                    <h3 className="font-heading font-bold text-2xl leading-tight mb-3 text-slate-900 group-hover:text-ieee-blue transition-colors duration-300">
                      {society.name}
                    </h3>
                    
                    <p className="text-slate-500 leading-relaxed mb-8 flex-grow line-clamp-4">
                      {society.description}
                    </p>
                    
                    {/* Action Area */}
                    <div className="mt-auto flex items-center text-sm font-semibold text-ieee-blue/80 group-hover:text-ieee-blue transition-colors duration-300">
                      Explore Chapter
                      <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
