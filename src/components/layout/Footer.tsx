"use client";

import { motion } from "framer-motion";
import { ArrowUp, Globe, Link, X, Mail } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { siteConfig, socialLinks } from "@/data";

const iconMap = { github: Globe, linkedin: Link, twitter: X, mail: Mail };

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.05] bg-[#02040a]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div className="flex flex-col items-center md:items-start gap-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-sm font-semibold tracking-tight text-zinc-300">{siteConfig.name}</p>
            <p className="text-xs text-zinc-600">&copy; {new Date().getFullYear()} All rights reserved.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <MagneticButton strength={0.2}>
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group flex items-center gap-2 px-4 py-2 rounded-full text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
                Back to top
                <span className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:border-sky-500/30 group-hover:bg-sky-500/10 transition-all duration-300">
                  <ArrowUp className="w-3 h-3" />
                </span>
              </button>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
