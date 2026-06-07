"use client";

import Link from "next/link";
import { ArrowUpRight, Send } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Marquee from "@/components/ui/Marquee";

// Replace this URL with your deployed Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyUZY4TFKqADJWWXvSoUeAILKBmBhcM8XUlnwag3LUoLlAImr_3uNvv3UKySL5ELFcu/exec";

const SocialIcon = ({ name }: { name: string }) => {
  if (name === "linkedin") return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
  if (name === "instagram") return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
  if (name === "twitter") return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
  if (name === "github") return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
  return null;
}

export default function Footer() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !GOOGLE_SCRIPT_URL) {
      if (!GOOGLE_SCRIPT_URL) alert("Google Script URL is not set up yet.");
      return;
    }

    setStatus("loading");
    try {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("timestamp", new Date().toISOString());

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      setStatus("success");
      setPhone("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error subscribing:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <footer className="relative bg-slate-950 pt-32 pb-10 overflow-x-clip text-white border-t-[8px] border-black mt-20 z-10">
      
      {/* Creative Marquee Tape Top Border */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none">
        <div className="absolute -top-6 left-0 w-full transform -rotate-2 origin-center">
          <Marquee text="INNOVATE ✦ CREATE ✦ LEAD" bgColor="bg-accent-cyan" textColor="text-black" rotate="rotate-0" direction="right" />
        </div>
        <div className="absolute -top-6 left-0 w-full transform rotate-2 origin-center">
          <Marquee text="IEEE STUDENT BRANCH NSSCE" bgColor="bg-[#FFD700]" textColor="text-black" rotate="rotate-0" />
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 mt-10 relative z-10">
        
        {/* Massive Call to Action */}
        <div className="mb-20 flex flex-col lg:flex-row items-end justify-between gap-8 border-b-2 border-white/10 pb-12">
          <h2 className="text-5xl md:text-7xl lg:text-[100px] font-heading font-black leading-[0.85] tracking-tighter text-transparent w-full" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.4)" }}>
            LET'S BUILD <br />
            <span className="text-white" style={{ WebkitTextStroke: "0" }}>THE FUTURE</span>
          </h2>
          <a href="https://www.ieee.org" target="_blank" rel="noopener noreferrer" className="bg-ieee-blue p-4 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-pointer block">
             <ArrowUpRight size={48} className="text-white stroke-[3px]" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand & Newsletter Block */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,215,0,1)] text-black mb-8 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <h3 className="text-3xl font-black mb-3 font-heading uppercase">Stay in the Loop...</h3>
              <p className="font-bold text-slate-700 mb-6 text-lg">Get the latest updates on events, workshops, and hackathons delivered straight to your phone.</p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={status === "loading" || status === "success"}
                  className="flex-1 bg-slate-50 border-4 border-black rounded-xl px-5 py-3 font-bold focus:outline-none focus:bg-white focus:ring-4 ring-accent-cyan transition-all placeholder-slate-400 text-lg"
                  required
                />
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="bg-black text-white px-8 py-3 rounded-xl font-black text-lg uppercase tracking-widest hover:bg-ieee-blue hover:text-white border-4 border-black transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {status === "loading" ? "..." : status === "success" ? "DONE!" : (
                    <>
                      JOIN <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
              {status === "success" && <p className="text-sm bg-green-400 border-2 border-black px-3 py-1 inline-block rounded-md text-black font-black mt-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">✓ Welcome to the club!</p>}
              {status === "error" && <p className="text-sm bg-red-400 border-2 border-black px-3 py-1 inline-block rounded-md text-black font-black mt-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">✕ Oops! Something went wrong.</p>}
            </div>
          </div>

          {/* Quick Links */}
          <div className="pl-0 lg:pl-10">
            <h4 className="font-heading font-black text-3xl mb-8 text-[#FFD700] uppercase tracking-wider flex items-center gap-3">
               Explore
               <div className="h-1 flex-1 bg-[#FFD700]/30 rounded-full"></div>
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/#about' },
                { name: 'Events', href: '/events' },
                { name: 'Team', href: '/team' },
                { name: 'Achievements', href: '/achievements' },
                { name: 'Gallery', href: '/gallery' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white/80 font-bold hover:text-black hover:bg-accent-cyan px-3 py-1 -mx-3 rounded-md transition-all text-lg flex items-center group w-max">
                    <ArrowUpRight size={20} className="mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all font-black stroke-[3px]" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
             <h4 className="font-heading font-black text-3xl mb-8 text-accent-cyan uppercase tracking-wider flex items-center gap-3">
               Connect
               <div className="h-1 flex-1 bg-accent-cyan/30 rounded-full"></div>
            </h4>
            <div className="space-y-6 mb-10">
              <p className="text-white/80 font-bold text-lg leading-relaxed">
                NSS College of Engineering<br />
                Akathethara, Palakkad<br />
                Kerala 678008, India
              </p>
              <a href="mailto:ieee@nssce.ac.in" className="inline-block text-xl font-black text-white hover:text-[#FFD700] border-b-4 border-transparent hover:border-[#FFD700] pb-1 transition-colors">
                ieee@nssce.ac.in
              </a>
            </div>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/ieeesbnssce" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-xl bg-slate-800 border-2 border-slate-700 hover:bg-[#FFD700] hover:text-black hover:border-[#FFD700] flex items-center justify-center text-white transition-all hover:scale-110 hover:-rotate-6 shadow-lg">
                <SocialIcon name="linkedin" />
              </a>
              <a href="https://www.instagram.com/ieeesbnssce" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-xl bg-slate-800 border-2 border-slate-700 hover:bg-accent-cyan hover:text-black hover:border-accent-cyan flex items-center justify-center text-white transition-all hover:scale-110 hover:rotate-6 shadow-lg">
                <SocialIcon name="instagram" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with huge text watermark */}
        <div className="border-t-2 border-white/10 pt-10 pb-6 relative flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden rounded-xl bg-white/5 px-8">
          <p className="text-white/70 font-bold z-10 flex items-center gap-2">
            © {new Date().getFullYear()} <span className="text-[#FFD700]">IEEE SB NSSCE</span>.
          </p>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none w-full overflow-hidden text-center flex justify-center">
             <span className="text-[12vw] font-black whitespace-nowrap tracking-tighter">IEEE SB NSSCE</span>
          </div>
          <p className="text-white/70 font-bold z-10 flex items-center gap-2">
            Developed by Web Team | <span className="text-accent-cyan animate-pulse">Execom'26</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

