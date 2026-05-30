"use client";

import { motion, Variants, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Calendar, Cpu, Code, Settings } from "lucide-react";
import Link from "next/link";
import { MouseEvent as ReactMouseEvent } from "react";

const circuitPaths = [
  "M52 540 C174 388 292 418 380 278 S612 106 784 220 970 346 1104 226 1182 126",
  "M18 252 C192 188 324 104 500 160 666 212 732 90 910 138 1024 170 1102 258 1196 214",
  "M74 682 C252 570 394 620 526 486 654 356 742 436 878 392 1004 350 1064 270 1194 310",
  "M156 104 L292 204 L430 170 L560 286 L720 242 L856 338 L1052 274",
];

export default function Hero() {
  const headingText = "IEEE Student Branch\nNSSCE";
  const letters = Array.from(headingText);
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
    },
  };

  // Background Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Background depth movement
  const meshX = useTransform(smoothX, [-500, 500], [28, -28]);
  const meshY = useTransform(smoothY, [-500, 500], [18, -18]);
  const gridX = useTransform(smoothX, [-500, 500], [16, -16]);
  const gridY = useTransform(smoothY, [-500, 500], [10, -10]);
  const spotlightX = useTransform(smoothX, [-500, 500], ["18%", "82%"]);
  const spotlightY = useTransform(smoothY, [-360, 360], ["20%", "76%"]);
  const cursorSpotlight = useMotionTemplate`radial-gradient(circle at ${spotlightX} ${spotlightY}, rgba(0, 194, 255, 0.28), rgba(0, 98, 155, 0.12) 24%, transparent 56%)`;

  // Floating shapes movement (Exaggerated parallax)
  const floatX1 = useTransform(smoothX, [-500, 500], [70, -70]);
  const floatY1 = useTransform(smoothY, [-500, 500], [70, -70]);
  const floatX2 = useTransform(smoothX, [-500, 500], [-90, 90]);
  const floatY2 = useTransform(smoothY, [-500, 500], [-90, 90]);
  const floatX3 = useTransform(smoothX, [-500, 500], [40, -40]);
  const floatY3 = useTransform(smoothY, [-500, 500], [-40, 40]);

  const handleMouseMove = (e: ReactMouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated technical background */}
      <div className="absolute inset-0 z-0 bg-white pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(118deg,#ffffff_0%,#f0fbff_32%,#f7faff_62%,#ffffff_100%)]" />

        <motion.div
          className="hero-energy-field absolute -inset-[28%]"
          style={{ x: meshX, y: meshY }}
          animate={reduceMotion ? undefined : { rotate: [0, 5, -4, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div className="absolute inset-0 opacity-90" style={{ background: cursorSpotlight }} />

        <motion.div
          className="hero-circuit-grid absolute inset-0"
          style={{ x: gridX, y: gridY }}
        />

        <motion.svg
          viewBox="0 0 1200 760"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full opacity-70"
        >
          {circuitPaths.map((path, index) => (
            <motion.path
              key={path}
              d={path}
              fill="none"
              stroke={index % 2 === 0 ? "rgba(0,98,155,0.28)" : "rgba(95,158,160,0.24)"}
              strokeWidth={index === 3 ? 1.3 : 1.8}
              strokeLinecap="round"
              strokeDasharray={index === 3 ? "10 18" : "14 24"}
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0.2 }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      pathLength: [0, 1, 1],
                      opacity: [0.18, 0.72, 0.28],
                      strokeDashoffset: [80, 0, -80],
                    }
              }
              transition={{
                duration: 8 + index * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.65,
              }}
            />
          ))}
        </motion.svg>

        <div className="hero-scanlines absolute inset-0 opacity-[0.18]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 z-10 text-center flex flex-col items-center">
        {/* Minimal Transparent Outline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="relative px-6 py-2 rounded-full border border-slate-200 bg-white/50 backdrop-blur-md hover:bg-white/80 hover:shadow-lg hover:border-ieee-blue/30 transition-all duration-300 inline-flex items-center gap-3 group cursor-default shadow-sm">
            {/* Static dot */}
            <div className="relative flex h-3 w-3 items-center justify-center">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-ieee-blue group-hover:scale-150 transition-transform"></span>
            </div>
            <span className="font-bold tracking-wide text-sm bg-gradient-to-r from-ieee-blue to-accent-cyan bg-clip-text text-transparent">
              Innovating Since 2001
            </span>
            <ArrowRight size={14} className="text-accent-cyan opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
          </div>
        </motion.div>

        {/* Main Heading with staggered characters */}
        <motion.h1
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {letters.map((letter, index) => {
            if (letter === '\n') return <br key={index} />;
            return (
              <motion.span
                key={index}
                variants={child}
                className={letter === " " ? "inline-block w-[0.3em]" : "inline-block text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70"}
              >
                {letter}
              </motion.span>
            );
          })}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Empowering the next generation of engineers, technologists, and leaders through innovation, community, and global networking.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/societies"
            className="group relative px-8 py-4 bg-ieee-blue text-white rounded-full font-medium shadow-lg shadow-ieee-blue/25 hover:shadow-ieee-blue/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            Explore Societies
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/events"
            className="px-8 py-4 glass text-foreground rounded-full font-medium hover:bg-white/80 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 border border-pale-silver/50 shadow-sm"
          >
            <Calendar size={18} className="text-ieee-blue" />
            Upcoming Events
          </Link>
        </motion.div>
      </div>

      {/* Floating Engineering Elements (Background) Parallax tracking */}
      <motion.div
        style={{ x: floatX1, y: floatY1 }}
        className="absolute left-[5%] md:left-[10%] top-[20%] text-ieee-blue/20 -z-10"
      >
        <motion.div
          animate={{ rotate: [0, 15, 0], y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cpu size={100} strokeWidth={1} className="w-16 h-16 md:w-[100px] md:h-[100px]" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ x: floatX2, y: floatY2 }}
        className="absolute right-[5%] md:right-[12%] bottom-[25%] text-accent-cyan/20 -z-10"
      >
        <motion.div
          animate={{ rotate: [0, -15, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Code size={120} strokeWidth={1} className="w-20 h-20 md:w-[120px] md:h-[120px]" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ x: floatX3, y: floatY3 }}
        className="absolute left-[10%] md:left-[18%] bottom-[15%] text-slate-400/20 -z-10"
      >
        <motion.div
          animate={{ rotate: [0, 30, 0], y: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Settings size={80} strokeWidth={1.5} className="w-12 h-12 md:w-[80px] md:h-[80px]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
