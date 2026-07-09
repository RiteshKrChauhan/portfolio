"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navigationItems } from "@/data";
import { useReducedMotion } from "@/hooks";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";
import { getLenis } from "@/lib/smooth-scroll";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const ids = navigationItems.map((item) => item.href.slice(1));
    const onScroll = () => {
      const scrollY = window.scrollY + 80;
      // Only highlight once we've scrolled past the hero into the first section
      const firstEl = document.getElementById(ids[0]);
      if (!firstEl || scrollY < firstEl.offsetTop) {
        setActiveSection("");
        return;
      }
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.slice(1);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(`#${id}`, {
        duration: prefersReduced ? 0 : 1.2,
        offset: -80,
      });
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
      });
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 pt-4 pb-3 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
      initial={{ y: -100, opacity: 0, filter: "blur(10px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* RKC — pinned to extreme top-left, static (no magnetic effect) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" })}
        className="absolute top-4 left-6 text-base font-bold tracking-tight text-zinc-100 hover:text-sky-400 transition-colors z-10"
      >
        RKC
      </button>

      <div className="flex items-center justify-end max-w-6xl mx-auto">
        <nav className="hidden md:flex items-center gap-1 rounded-2xl glass shadow-[0_4px_24px_rgba(0,0,0,0.5)] px-3 py-1.5">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="relative px-4 py-2 text-sm transition-colors group"
              >
                <span className={cn(
                  "relative z-10 transition-colors duration-200",
                  isActive ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-200"
                )}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg bg-white/[0.06] border border-white/[0.08]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-px bg-sky-500/50 w-0 group-hover:w-4 transition-all duration-300" />
              </button>
            );
          })}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-8 h-8 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            {[
              mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 },
              mobileOpen ? { opacity: 0 } : { opacity: 1 },
              mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 },
            ].map((anim, i) => (
              <motion.span
                key={i}
                className="h-px bg-zinc-400 w-full block origin-center"
                animate={anim}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden md:hidden mt-2 glass rounded-2xl"
          >
            <div className="py-3 flex flex-col gap-1 px-2">
              {navigationItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-3 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] rounded-xl text-left transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
