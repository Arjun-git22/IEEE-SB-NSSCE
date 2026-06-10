"use client";

import { motion, AnimatePresence } from "framer-motion";
import { societies } from "@/data/societies";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Pin } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { MouseEvent, PointerEvent } from "react";
import type { Society } from "@/data/types";

type ViewAllNode = {
  id: "view-all";
  name: string;
  shortName: string;
  isViewAll: true;
  slug: string;
  accentColor?: string;
  logo?: string;
  logoRotation?: string;
  description?: string;
};

type SocietyNode = (Society & { isViewAll?: false }) | ViewAllNode;

export default function SocietiesShowcase() {
  const [activeNode, setActiveNode] = useState<SocietyNode | null>(null);
  const [hasTouchInteraction, setHasTouchInteraction] = useState(false);
  const touchInteractionRef = useRef(false);

  const nodes = useMemo<SocietyNode[]>(() => [
    ...societies,
    {
      id: 'view-all',
      name: 'Explore All Societies',
      shortName: 'ALL',
      isViewAll: true,
      slug: ''
    }
  ], []);

  const innerNodes = useMemo(() => nodes.filter((_, i) => i % 2 === 0), [nodes]);
  const outerNodes = useMemo(() => nodes.filter((_, i) => i % 2 !== 0), [nodes]);

  const handlePointerDown = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType === "touch") {
      touchInteractionRef.current = true;
      setHasTouchInteraction(true);
    }
  };

  const handleNodeClick = (e: MouseEvent<HTMLAnchorElement>, node: SocietyNode) => {
    if (touchInteractionRef.current && activeNode?.id !== node.id) {
      e.preventDefault();
      setActiveNode(node);
    }
  };

  const renderNodes = (nodeList: SocietyNode[], isInner: boolean) => {
    return nodeList.map((node, i) => {
      const angle = (i / nodeList.length) * 360;
      const radiusVar = isInner ? 'var(--orbit-radius-inner)' : 'var(--orbit-radius-outer)';
      const itemClass = isInner ? 'orbit-item-inner' : 'orbit-item-outer';

      return (
        <div
          key={node.id}
          className="absolute top-1/2 left-1/2 w-0 h-0"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div
            className="absolute"
            style={{ transform: `translateY(calc(-1 * ${radiusVar}))` }}
          >
            <div className={itemClass}>
              <div
                style={{ transform: `rotate(${-angle}deg)` }}
                className="w-12 h-12 md:w-16 md:h-16 -ml-6 -mt-6 md:-ml-8 md:-mt-8 pointer-events-auto"
                onMouseEnter={() => !touchInteractionRef.current && setActiveNode(node)}
                onMouseLeave={() => !touchInteractionRef.current && setActiveNode(null)}
              >
                <Link
                  href={node.isViewAll ? "/societies" : `/societies/${node.slug}`}
                  onPointerDown={handlePointerDown}
                  onClick={(e) => handleNodeClick(e, node)}
                  className="block w-full h-full outline-none focus:ring-2 focus:ring-ieee-blue rounded-full touch-pan-y"
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-300 relative overflow-hidden group border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] ${node.isViewAll
                      ? 'bg-[#FFD700] text-black'
                      : `bg-white ${node.logo ? '' : 'text-black font-black'} ${node.logo ? '' : node.accentColor || 'bg-ieee-blue'}`
                      }`}
                  >
                    {node.isViewAll ? (
                      <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform md:w-6 md:h-6 stroke-[3px]" />
                    ) : node.logo ? (
                      <Image src={node.logo} alt={node.shortName} width={40} height={40} draggable={false} style={{ transform: node.logoRotation }} className="w-8 h-8 md:w-10 md:h-10 object-contain z-10 pointer-events-none" />
                    ) : (
                      <span className="font-black text-[11px] md:text-base tracking-wider z-10">{node.shortName}</span>
                    )}
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <section className="pt-12 pb-12 relative overflow-hidden bg-slate-50/50">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ieee-blue/5 rounded-full blur-3xl -z-10"></div>

      {/* Sticky Note: Vision (Desktop only) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="hidden lg:block absolute top-1/4 left-8 xl:left-16 z-20"
      >
        <motion.div
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          whileHover={{ rotate: -3, transition: { duration: 0.2 } }}
          className="w-56 xl:w-64 bg-[#FFEB3B] p-6 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          style={{ transformOrigin: "top center" }}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-red-500">
            <Pin size={32} fill="currentColor" className="drop-shadow-sm rotate-12" />
          </div>
          <h3 className="font-heading font-black text-lg text-black mb-2 mt-2">IEEE Vision</h3>
          <p className="text-sm text-black font-bold leading-relaxed italic">
            {'"IEEE will be essential to the global technical community... and be universally recognized for the contributions of technology in improving global conditions."'}
          </p>
        </motion.div>
      </motion.div>

      {/* Sticky Note: Mission (Desktop only) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="hidden lg:block absolute bottom-24 right-8 xl:right-16 z-20"
      >
        <motion.div
          animate={{ rotate: [4, -2, 4] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          whileHover={{ rotate: 4, transition: { duration: 0.4 } }}
          className="w-56 xl:w-64 bg-accent-cyan p-6 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          style={{ transformOrigin: "top center" }}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-red-500">
            <Pin size={32} fill="currentColor" className="drop-shadow-sm -rotate-12" />
          </div>
          <h3 className="font-heading font-black text-lg text-black mb-2 mt-2">IEEE Mission</h3>
          <p className="text-sm text-black font-bold leading-relaxed italic">
            {'"IEEE\'s core purpose is to foster technological innovation and excellence for the benefit of humanity."'}
          </p>
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4 md:px-12 lg:px-20 relative z-10">
        <div className="text-center mt-8 mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-heading font-black mb-8 text-slate-900"
          >
            Explore Our <span className="relative inline-block"><span className="relative z-10 text-white px-2">Societies</span><span className="absolute -bottom-1 left-0 w-full h-full bg-[#FFD700] -z-0 -rotate-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" /></span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-slate-800 font-medium max-w-2xl mx-auto text-lg"
          >
            Discover the specialized student chapters driving innovation across various engineering and technology domains.
          </motion.p>
        </div>

        {/* Orbit Interactive Visualization */}
        <div className="relative w-full max-w-3xl mx-auto h-[420px] md:h-[650px] flex items-center justify-center orbit-wrapper mt-8 md:mt-12 touch-pan-y">

          <style dangerouslySetInnerHTML={{
            __html: `
            :root {
              --orbit-radius-inner: 130px;
              --orbit-radius-outer: 195px;
            }
            @media (min-width: 768px) {
              :root {
                --orbit-radius-inner: 190px;
                --orbit-radius-outer: 290px;
              }
            }
            .orbit-container-inner {
              animation: spin 40s linear infinite;
            }
            .orbit-container-outer {
              animation: spin-reverse 55s linear infinite;
            }
            .orbit-item-inner {
              animation: counter-spin 40s linear infinite;
            }
            .orbit-item-outer {
              animation: counter-spin-reverse 55s linear infinite;
            }
            .orbit-wrapper:hover .orbit-container-inner,
            .orbit-wrapper:hover .orbit-container-outer,
            .orbit-wrapper:hover .orbit-item-inner,
            .orbit-wrapper:hover .orbit-item-outer {
              animation-play-state: paused;
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes spin-reverse {
              from { transform: rotate(0deg); }
              to { transform: rotate(-360deg); }
            }
            @keyframes counter-spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(-360deg); }
            }
            @keyframes counter-spin-reverse {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}} />

          {/* Orbit Rings Decorations */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(var(--orbit-radius-inner)*2)] h-[calc(var(--orbit-radius-inner)*2)] rounded-full border border-ieee-blue/10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(var(--orbit-radius-outer)*2)] h-[calc(var(--orbit-radius-outer)*2)] rounded-full border border-dashed border-ieee-blue/20"></div>

          {/* Inner Nodes */}
          <div className="absolute inset-0 orbit-container-inner pointer-events-none">
            {renderNodes(innerNodes, true)}
          </div>

          {/* Outer Nodes */}
          <div className="absolute inset-0 orbit-container-outer pointer-events-none">
            {renderNodes(outerNodes, false)}
          </div>

          {/* Central Hub */}
          <div className="relative z-10 w-40 h-40 md:w-64 md:h-64 rounded-full bg-white border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center text-center p-3 md:p-6 overflow-hidden">
            {/* Subtle inner glow */}
            <div className={`absolute inset-0 opacity-20 transition-colors duration-500 ${activeNode && !activeNode.isViewAll ? activeNode.accentColor : 'bg-[#FFD700]'}`}></div>

            <AnimatePresence mode="wait">
              {activeNode ? (
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center relative z-10 w-full"
                >
                  {activeNode.isViewAll ? (
                    <>
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black mb-2 md:mb-3">
                        <ArrowRight size={24} className="md:w-6 md:h-6 stroke-[3px]" />
                      </div>
                      <h3 className="font-black text-xs md:text-xl text-slate-900 leading-tight">View All Societies</h3>
                      <p className="text-[9px] md:text-sm font-bold text-slate-600 mt-1 md:mt-2">Click to explore directory</p>
                    </>
                  ) : (
                    <>
                      {activeNode.logo ? (
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-1 md:mb-2 bg-white p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          <Image src={activeNode.logo} alt={activeNode.shortName} width={64} height={64} style={{ transform: activeNode.logoRotation }} className="w-full h-full object-contain pointer-events-none" />
                        </div>
                      ) : (
                        <div className={`w-8 h-8 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white font-black mb-1 md:mb-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[10px] md:text-base ${activeNode.accentColor}`}>
                          {activeNode.shortName}
                        </div>
                      )}
                      <h3 className="font-black text-[11px] md:text-lg leading-tight mb-1 md:mb-2 text-slate-900 px-1">{activeNode.name}</h3>
                      <p className="text-[9px] md:text-xs text-slate-600 line-clamp-3 md:line-clamp-4 px-1 leading-snug">
                        {activeNode.description}
                      </p>
                      {hasTouchInteraction && (
                        <p className="text-[8px] text-ieee-blue mt-1 font-bold tracking-wider">TAP TO VISIT</p>
                      )}
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-10"
                >
                  <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl border-2 border-black bg-[#FFD700] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black mx-auto mb-3 md:mb-4">
                    <span className="font-black text-base md:text-3xl">{societies.length}</span>
                  </div>
                  <h3 className="font-black text-slate-900 text-xs md:text-xl">IEEE Societies</h3>
                  <p className="text-[8px] md:text-sm text-slate-600 mt-1 uppercase tracking-widest font-bold">
                    {hasTouchInteraction ? 'Tap icons to explore' : 'Hover to explore'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
