"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin, GraduationCap, Download } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { achievements, siteConfig } from "@/data";
import { useReducedMotion } from "@/hooks";
import { MagneticButton } from "@/components/ui/MagneticButton";

function AnimatedStat({ value, suffix, title, delay }: {
  value: string; suffix?: string; title: string; delay: number;
}) {
  return (
    <motion.div
      className="glass rounded-2xl p-4 glass-hover group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="text-2xl font-bold text-gradient-space">{value}{suffix ?? ""}</div>
      <div className="text-xs text-zinc-500 mt-0.5">{title}</div>
    </motion.div>
  );
}

export function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [12, -12]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), { stiffness: 100, damping: 30 });
  const glowBg = useTransform(
    [mouseX, mouseY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(126,184,247,0.12), transparent 60%)`
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current || prefersReduced) return;
    const rect = imageRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  // Split description on \n\n to render as separate paragraphs
  const descParagraphs = siteConfig.description.split(/\n\n+/);

  return (
    <AnimatedSection id="about" className="py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="About"
          title="Crafting digital experiences"
        />
        <div className="grid lg:grid-cols-2 gap-0 items-center">
          {/* Image / Avatar panel */}
          <motion.div
            ref={imageRef}
            className="relative aspect-[4/5] max-w-xs mx-auto lg:mx-0 rounded-3xl overflow-hidden cursor-none"
            style={prefersReduced ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0.5); mouseY.set(0.5); }}
            initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#060810] via-[#0a0f1e] to-[#060810]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/[0.06] via-transparent to-blue-500/[0.06]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl font-bold text-gradient-space opacity-15 select-none">
                {siteConfig.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <motion.div
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: glowBg }}
            />
            <div className="absolute inset-0 rounded-3xl border border-white/[0.05]" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          </motion.div>

          {/* Text content */}
          <div className="space-y-5">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Render each paragraph from \n\n splits */}
              <div className="space-y-3">
                {descParagraphs.map((para, i) => (
                  <p key={i} className="text-md text-zinc-400 leading-relaxed">
                    {para.trim()}
                  </p>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
                  <GraduationCap className="w-3 h-3 text-sky-400" />
                  BMS College of Engineering
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
                  <MapPin className="w-3 h-3 text-blue-400" />
                  {siteConfig.location}
                </span>
              </div>

              <MagneticButton strength={0.2}>
                <a
                  href={siteConfig.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium text-zinc-300 border border-white/[0.1] hover:border-sky-500/30 hover:text-white hover:bg-sky-500/[0.05] transition-all duration-300"
                >
                  <Download className="w-3 h-3" />
                  Download Resume
                </a>
              </MagneticButton>
            </motion.div>

            {/* Stat cards — 3 columns */}
            <div className="grid grid-cols-3 gap-3">
              {achievements.map((a, i) => (
                <AnimatedStat key={a.id} value={a.value} suffix={a.suffix} title={a.title} delay={0.4 + i * 0.1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
