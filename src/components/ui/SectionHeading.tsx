"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ label, title, description, className = "" }: SectionHeadingProps) {
  return (
    <motion.div
      className={`mb-16 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-sky-400 mb-4">
        {label}
      </span>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-gradient-space">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-zinc-500 max-w-2xl">{description}</p>
      )}
    </motion.div>
  );
}
