"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RevealChars } from "@/components/ui/RevealText";
import { useReducedMotion } from "@/hooks";

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const prefersReduced = useReducedMotion();

  const springX = useSpring(mouseX, { stiffness: 60, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 30 });

  const spotlightBg = useTransform(
    [springX, springY],
    ([x, y]: number[]) =>
      `radial-gradient(700px circle at ${x}px ${y}px, rgba(126,184,247,0.045), transparent 75%)`
  );

  useEffect(() => {
    if (prefersReduced) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, prefersReduced]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
    });
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-20 overflow-hidden">
      <motion.div
        className="pointer-events-none fixed inset-0 z-[5]"
        style={{ background: spotlightBg }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl">
        <motion.p
          className="mb-8 text-xs font-medium tracking-[0.2em] uppercase"
          style={{ color: "#7eb8f7" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          BUILDING INTELLIGENT SYSTEMS
        </motion.p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5 leading-none">
          <RevealChars as="span" delay={0.4} stagger={0.025} className="text-gradient-space">
            {siteConfig.name}
          </RevealChars>
        </h1>

        <motion.div
          className="mb-5 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-lg sm:text-xl md:text-2xl font-light tracking-wide text-zinc-300">
            {siteConfig.title}
          </p>
        </motion.div>

        <motion.p
          className="max-w-xl text-base sm:text-lg leading-relaxed mb-12 text-zinc-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <MagneticButton strength={0.3}>
            <button
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-zinc-100 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.08)]"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </MagneticButton>

          <MagneticButton strength={0.25}>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium text-zinc-300 border border-white/[0.1] hover:border-sky-500/30 hover:text-white hover:bg-sky-500/[0.05] transition-all duration-300"
            >
              Let's Connect
            </button>
          </MagneticButton>
        </motion.div>


      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-zinc-600 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
