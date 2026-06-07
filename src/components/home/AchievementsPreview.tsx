"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Trophy, Star, Award } from "lucide-react";
import Link from "next/link";
import { achievements } from "@/data/achievements";

const iconColors = [
  { icon: Trophy, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  { icon: Award, color: "text-ieee-blue", bgColor: "bg-ieee-blue/10" },
  { icon: Star, color: "text-accent-cyan", bgColor: "bg-accent-cyan/10" },
];

const highlights = achievements.slice(0, 3).map((achievement, index) => {
  const style = iconColors[index % iconColors.length];
  return {
    id: achievement.id,
    year: achievement.year.toString(),
    title: achievement.title,
    description: achievement.description,
    ...style
  };
});

export default function AchievementsPreview() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section className="py-24 relative bg-white text-slate-900 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-ieee-blue/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center p-3 rounded-xl bg-[#FFD700] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8"
            >
              <Trophy className="text-black stroke-[2.5px]" size={32} />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading font-black mb-8 leading-tight"
            >
              A Legacy of <span className="relative inline-block"><span className="relative z-10 text-white px-2">Excellence</span><span className="absolute -bottom-1 left-0 w-full h-full bg-ieee-blue -z-0 rotate-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" /></span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-800 font-medium text-lg"
            >
              Recognized globally and nationally for our consistent dedication to technological advancement and community building.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/achievements"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-black rounded-xl text-black font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all group"
            >
              View Full Timeline
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-colors">
                <ArrowRight size={18} className="stroke-[3px] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Clean Grid (Removed intersecting timeline line and dots) */}
        <div className="relative">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <motion.div key={highlight.id} variants={item} className="relative group h-full outline-none">
                  <div className="h-full p-8 rounded-xl bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-300 flex flex-col cursor-default">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white`}>
                        <Icon size={28} className="text-black stroke-[2.5px]" />
                      </div>
                      <div>
                        <span className="text-sm font-black tracking-widest text-slate-800 uppercase bg-[#FFD700] px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">{highlight.year}</span>
                      </div>
                    </div>

                    <h3 className="font-heading font-black text-2xl mb-3 text-slate-900 leading-tight">
                      {highlight.title}
                    </h3>

                    <p className="text-slate-700 font-medium text-sm leading-relaxed mt-auto">
                      {highlight.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
