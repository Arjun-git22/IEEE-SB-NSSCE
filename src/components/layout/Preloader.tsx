"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// SVG for the wave effect, using preserveAspectRatio="none" to scale properly to the text height
const WAVE_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 800 800' preserveAspectRatio='none'%3E%3Cpath d='M 0,400 Q 100,350 200,400 T 400,400 T 600,400 T 800,400 L 800,800 L 0,800 Z' fill='white'/%3E%3C/svg%3E`;

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 100;
    const duration = 2500; // 2.5 seconds
    const interval = 20;
    const step = (end - start) / (duration / interval);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setProgress(100);
        clearInterval(timer);
      } else {
        setProgress(start);
      }
    }, interval);

    const fadeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    const unmountTimer = setTimeout(() => {
      setIsMounted(false);
    }, 3800);

    return () => {
      clearInterval(timer);
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <style>
        {`
          .liquid-text {
            background-image: url("${WAVE_SVG}");
            background-color: rgba(255, 255, 255, 0.15);
            background-size: 800px 200%;
            background-repeat: repeat-x;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
          }
        `}
      </style>
      <motion.div
        className="fixed inset-0 z-[100] bg-[#0c0c0c] flex items-center justify-center overflow-hidden"
        animate={{ 
          opacity: isLoading ? 1 : 0,
        }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
      >
        <motion.div
          animate={
            !isLoading ? {
              scale: 80,
              opacity: 0,
            } : {
              scale: 1,
              opacity: 1
            }
          }
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="relative flex flex-col items-center"
        >
          {/* Main Container */}
          <div className="relative inline-block">
            {/* The Liquid Fill Text */}
            <motion.h1 
              className="liquid-text text-5xl md:text-7xl lg:text-9xl font-heading font-black tracking-tight select-none py-2 px-1"
              animate={{ backgroundPositionX: ["0px", "-800px"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{
                // Map progress 0-100 to backgroundPositionY 0% to 100%
                backgroundPositionY: `${progress}%`
              }}
            >
              IEEE SB NSSCE
            </motion.h1>

            {/* Small loading text positioned at bottom right */}
            <div className="absolute bottom-0 right-2 md:right-4 text-white font-mono text-[10px] md:text-xs tracking-widest flex gap-2 translate-y-[120%] whitespace-nowrap">
              <span className="opacity-70">loading...</span>
              <span className="w-12 text-right font-bold">{Math.round(progress)} %</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
