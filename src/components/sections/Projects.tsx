"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { GitBranch, X, ArrowUpRight, GitFork } from "lucide-react";
import { getLenis } from "@/lib/smooth-scroll";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, type Project } from "@/data";

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const glowBg = useTransform(
    [mouseX, mouseY],
    ([x, y]: number[]) =>
      `radial-gradient(400px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(126,184,247,0.07), transparent 60%)`
  );

  return (
    <motion.div
      ref={cardRef}
      className="group relative rounded-3xl overflow-hidden glass cursor-pointer"
      onMouseMove={(e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => { mouseX.set(0.5); mouseY.set(0.5); }}
      onClick={() => onOpen(project)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -4 }}
    >
      <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[1]" style={{ background: glowBg }} />
      <div className="relative h-52 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/[0.07] via-blue-500/[0.05] to-indigo-500/[0.07] group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl opacity-[0.06] group-hover:opacity-[0.12] transition-opacity select-none font-bold text-white">
            {project.title.slice(0, 2).toUpperCase()}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {project.featured && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-sky-500/10 border border-sky-500/20 text-sky-400 backdrop-blur-sm">
            Featured
          </div>
        )}
      </div>
      <div className="relative z-[2] p-6 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-sky-400 transition-colors leading-snug">{project.title}</h3>
          <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-sky-400 transition-all duration-300 flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.slice(0, 4).map((tech) => (
            <span key={tech} className="px-2.5 py-1 text-[11px] font-medium text-zinc-500 bg-white/[0.03] rounded-md border border-white/[0.04]">{tech}</span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2.5 py-1 text-[11px] font-medium text-zinc-600">+{project.tech.length - 4}</span>
          )}
        </div>
      </div>
      <div className="absolute inset-0 rounded-3xl border border-white/[0.06] group-hover:border-sky-500/[0.15] transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
}

function RoadmapItem({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void }) {
  const isLeft = index % 2 === 0;
  const itemRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: itemProgress } = useScroll({
    target: itemRef,
    offset: ["start 62%", "center 25%"],
  });

  const lineOpacity = useTransform(itemProgress, [0, 0.01, 0.55, 1], [0, 1, 1, 0]);

  return (
    <div ref={itemRef} className="relative md:grid md:min-h-[292px] md:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] md:items-center">
      <div className={`pl-12 md:pl-0 ${isLeft ? "md:col-start-1 md:pr-7" : "md:col-start-3 md:pl-7"}`}>
        <ProjectCard project={project} index={index} onOpen={onOpen} />
      </div>

      <motion.div
        className="hidden md:block absolute pointer-events-none"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
          height: "1px",
          opacity: lineOpacity,
          ...(isLeft
            ? {
                left: "calc(50% - 64px)",
                width: "64px",
                background: "linear-gradient(to right, rgba(186,230,253,0.9) 0%, rgba(125,211,252,0.55) 50%, transparent 100%)",
              }
            : {
                left: "50%",
                width: "64px",
                background: "linear-gradient(to left, rgba(186,230,253,0.9) 0%, rgba(125,211,252,0.55) 50%, transparent 100%)",
              }),
        }}
      />

      <motion.div
        className="md:hidden absolute pointer-events-none"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
          left: "16px",
          width: "32px",
          height: "1px",
          opacity: lineOpacity,
          background: "linear-gradient(to right, rgba(186,230,253,0.9), rgba(125,211,252,0.4), transparent)",
        }}
      />
    </div>
  );
}

function ExploreMoreCard({ onVisible }: { onVisible: (visible: boolean) => void }) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const threshold = window.innerHeight * 0.62;
    const check = () => {
      const top = el.getBoundingClientRect().top;
      const reached = top <= threshold;
      setLit(reached);
      onVisible(reached);
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, [onVisible]);

  return (
    <div className="flex justify-center pl-12 md:pl-0 pb-8 mt-32">
      <div className="relative w-full max-w-md">
        {/* sentinel at exact card top edge */}
        <div ref={sentinelRef} className="absolute top-0 left-0 w-full h-px pointer-events-none" />
        <a
          href="https://github.com/RiteshKrChauhan"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-between gap-6 rounded-3xl px-8 py-7 overflow-hidden glass cursor-pointer w-full transition-all duration-700"
          style={{
            border: lit ? "1px solid rgba(125,211,252,0.45)" : "1px solid rgba(255,255,255,0.06)",
            boxShadow: lit ? "0 0 24px rgba(125,211,252,0.2), 0 0 48px rgba(125,211,252,0.08)" : "none",
          }}
        >
          {lit && (
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(125,211,252,0.12) 0%, transparent 70%)" }}
            />
          )}
          <div className="relative z-10">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-400 mb-1">More work</p>
            <h3 className="text-xl font-semibold text-zinc-100 group-hover:text-sky-300 transition-colors">Explore all my projects</h3>
            <p className="text-sm text-zinc-500 mt-1">See everything I&apos;ve built on GitHub →</p>
          </div>
          <div className="relative z-10 flex-shrink-0">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/[0.08] group-hover:bg-sky-500/10 group-hover:border-sky-500/30 transition-all duration-300"
              style={lit ? { filter: "drop-shadow(0 0 8px rgba(125,211,252,0.7))" } : {}}
            >
              <GitFork className="w-5 h-5 text-zinc-400 group-hover:text-sky-400 transition-colors" />
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    return () => { lenis?.start(); };
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div className="fixed inset-0 z-[1000] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl glass border border-white/[0.08]"
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] backdrop-blur-md transition-colors" aria-label="Close" type="button">
          <X className="w-4 h-4" />
        </button>
        <div className="max-h-[90vh] overflow-y-auto p-8" data-lenis-prevent>
          <div className="relative h-56 rounded-2xl overflow-hidden mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-blue-500/[0.07] to-indigo-500/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold opacity-[0.05] text-white">{project.title.slice(0, 2).toUpperCase()}</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-3 text-gradient-space">{project.title}</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">{project.longDescription}</p>
          {project.architecture && (
            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 mb-3">Architecture</h3>
              <div className="flex flex-wrap gap-2">
                {project.architecture.map((arch) => (
                  <span key={arch} className="px-3 py-1.5 text-xs font-medium text-sky-400 bg-sky-500/[0.08] rounded-lg border border-sky-500/[0.12]">{arch}</span>
                ))}
              </div>
            </div>
          )}
          <div className="mb-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="px-3 py-1.5 text-xs font-medium text-zinc-300 bg-white/[0.04] rounded-lg border border-white/[0.06]">{tech}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] transition-all">
                <GitBranch className="w-4 h-4" /> Source
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-white text-black hover:bg-zinc-200 transition-all">
                <GitBranch className="w-4 h-4" /> GitHub Repo Link
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);
  const roadmapProjects = [...featuredProjects, ...otherProjects];
  const { scrollYProgress } = useScroll({
    target: roadmapRef,
    offset: ["start 95%", "end 20%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.12,
    restDelta: 0.001,
  });

  const [starHidden, setStarHidden] = useState(false);

  const spineOpacity = useTransform(smoothProgress, [0, 1], [0.18, 0.45]);
  const starOpacity = useTransform(smoothProgress, [0, 0.02], [0, 1]);
  const trailScaleY = useTransform(smoothProgress, [0, 0.03, 0.35], [0, 0.04, 1]);
  const trailOpacity = useTransform(smoothProgress, [0, 0.03, 0.2], [0, 0, 1]);
  const headGlow = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [
      "drop-shadow(0 0 4px #e0f2fe) drop-shadow(0 0 12px #38bdf8)",
      "drop-shadow(0 0 6px #f0f9ff) drop-shadow(0 0 20px #7dd3fc) drop-shadow(0 0 40px #0ea5e9)",
      "drop-shadow(0 0 8px #fff) drop-shadow(0 0 28px #bae6fd) drop-shadow(0 0 60px #38bdf8)",
    ]
  );

  return (
    <>
      <AnimatedSection id="projects" className="py-32 px-4">
        <div className="mx-auto max-w-6xl">
          <SectionHeading label="Projects" title="Selected work" description="A showcase of projects that represent my best work in software engineering and design." />
          <div
            ref={roadmapRef}
            className="relative"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
            }}
          >
            {/* Static spine line */}
            <div className="pointer-events-none absolute inset-x-0 bottom-8 top-0 overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 md:left-1/2"
                style={{
                  opacity: spineOpacity,
                  background: "linear-gradient(to bottom, transparent 0%, rgba(125,211,252,0.1) 20%, rgba(125,211,252,0.18) 50%, rgba(125,211,252,0.1) 80%, transparent 100%)",
                  boxShadow: "0 0 6px rgba(125,211,252,0.06)",
                }}
              />
            </div>

            {/* Shooting star */}
            <div className="pointer-events-none sticky top-[62vh] z-10 h-0" style={{ visibility: starHidden ? "hidden" : "visible" }}>
              <motion.div
                className="absolute left-4 -translate-x-1/2 md:left-1/2"
                style={{ opacity: starOpacity, filter: headGlow }}
              >
                <motion.div
                  className="absolute"
                  style={{
                    bottom: "0px",
                    left: "50%",
                    translateX: "-50%",
                    transformOrigin: "bottom center",
                    scaleY: trailScaleY,
                    opacity: trailOpacity,
                    width: "1px",
                    height: "0px",
                  }}
                >
                  <svg
                    width="60"
                    height="260"
                    viewBox="0 0 60 260"
                    style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", overflow: "visible" }}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="trailCore" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%"   stopColor="#ffffff"  stopOpacity="1"    />
                        <stop offset="8%"   stopColor="#ffffff"  stopOpacity="0.95" />
                        <stop offset="20%"  stopColor="#e0f2fe"  stopOpacity="0.65" />
                        <stop offset="55%"  stopColor="#7dd3fc"  stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#0369a1"  stopOpacity="0"    />
                      </linearGradient>
                      <linearGradient id="trailGlow" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%"   stopColor="#ffffff"  stopOpacity="0.5"  />
                        <stop offset="8%"   stopColor="#bae6fd"  stopOpacity="0.38" />
                        <stop offset="45%"  stopColor="#38bdf8"  stopOpacity="0.14" />
                        <stop offset="100%" stopColor="#0284c7"  stopOpacity="0"    />
                      </linearGradient>
                      <linearGradient id="trailHalo" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%"   stopColor="#7dd3fc"  stopOpacity="0.18" />
                        <stop offset="55%"  stopColor="#0ea5e9"  stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#0c4a6e"  stopOpacity="0"    />
                      </linearGradient>
                      <radialGradient id="headCap" cx="50%" cy="50%" r="50%">
                        <stop offset="0%"   stopColor="#ffffff"  stopOpacity="0.95" />
                        <stop offset="35%"  stopColor="#e0f2fe"  stopOpacity="0.7"  />
                        <stop offset="70%"  stopColor="#7dd3fc"  stopOpacity="0.3"  />
                        <stop offset="100%" stopColor="#0369a1"  stopOpacity="0"    />
                      </radialGradient>
                      <filter id="trailBlur" x="-300%" y="-5%" width="700%" height="110%">
                        <feGaussianBlur stdDeviation="4.5" />
                      </filter>
                      <filter id="trailBlurSm" x="-150%" y="-5%" width="400%" height="110%">
                        <feGaussianBlur stdDeviation="1.8" />
                      </filter>
                      <filter id="headCapBlur" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="3" />
                      </filter>
                    </defs>
                    <path d="M 30,0 L 10,248 A 20,12 0 0,0 50,248 Z" fill="url(#trailHalo)" filter="url(#trailBlur)" />
                    <path d="M 30,0 L 20,252 A 10,7 0 0,0 40,252 Z" fill="url(#trailGlow)" filter="url(#trailBlurSm)" />
                    <path d="M 30,0 L 28.2,256 A 1.8,2 0 0,0 31.8,256 Z" fill="url(#trailCore)" />
                    <line x1="30" y1="4" x2="30" y2="258" stroke="#ffffff" strokeWidth="0.6" strokeLinecap="round" opacity="0.55" />
                    <circle cx="30" cy="256" r="10" fill="url(#headCap)" filter="url(#headCapBlur)" />
                    <circle cx="30" cy="256" r="3" fill="#ffffff" opacity="0.9" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>

            <div className="space-y-7 md:space-y-0">
              {roadmapProjects.map((project, i) => (
                <RoadmapItem key={project.id} project={project} index={i} onOpen={setSelectedProject} />
              ))}
              <ExploreMoreCard onVisible={(v) => setStarHidden(v)} />
            </div>
          </div>
        </div>
      </AnimatedSection>
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </>
  );
}
