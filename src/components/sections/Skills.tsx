"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills, skillCategories } from "@/data";

export function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredSkills = activeCategory === "all" ? skills : skills.filter((s) => s.category === activeCategory);

  return (
    <AnimatedSection id="skills" className="py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Skills"
          title="Technologies I work with"
          description="These are the technologies I use to design, build, deploy, and scale modern applications."
        />
        <motion.div
          className="flex flex-wrap gap-2 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat.id
                ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                : "text-zinc-400 hover:text-zinc-200 bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12]"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        <motion.div className="flex flex-wrap gap-3 justify-center" layout>
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { duration: 0.4, delay: i * 0.02, ease: [0.25, 0.1, 0.25, 1] }
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                className="group relative"
              >
                <div
                  className="relative px-5 py-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-sky-500/25 transition-all duration-300 hover:bg-white/[0.05] cursor-default overflow-hidden"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 20px rgba(126,184,247,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-sky-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="relative flex items-center gap-2 text-sm font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors">
                    <img src={skill.icon} alt={skill.name} className="h-5 w-auto" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
