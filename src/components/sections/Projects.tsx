"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { GitBranch, X, ArrowUpRight } from "lucide-react";
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

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    return () => { lenis?.start(); };
  }, []);

  return (
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl glass border border-white/[0.08] p-8"
        data-lenis-prevent
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-colors" aria-label="Close">
          <X className="w-4 h-4" />
        </button>
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
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <>
      <AnimatedSection id="projects" className="py-32 px-4">
        <div className="mx-auto max-w-6xl">
          <SectionHeading label="Projects" title="Selected work" description="A showcase of projects that represent my best work in software engineering and design." />
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onOpen={setSelectedProject} />
            ))}
          </div>
          {otherProjects.length > 0 && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-500 mb-6">More Projects</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {otherProjects.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i + featuredProjects.length} onOpen={setSelectedProject} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </AnimatedSection>
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </>
  );
}
