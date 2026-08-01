"use client";

import { motion } from "framer-motion";
import { Globe, Link, Mail } from "lucide-react";
import { siteConfig } from "@/data";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { socialLinks } from "@/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  mail: Mail,
  linkedin: Link,
  github: Globe
};

const linkLabels: Record<string, string> = {
  mail: "Gmail",
  linkedin: "LinkedIn",
  github: "GitHub"
};

function getHref(link: { icon: string; href: string }) {
  if (link.icon === "mail") {
    return `https://mail.google.com/mail/?view=cm&to=${siteConfig.email}`;
  }
  return link.href;
}

export function Contact() {
  return (
    <AnimatedSection id="contact" className="py-32 px-4">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading
          label="Contact"
          title="Let's work together"
          className="text-center [&>*]:mx-auto"
        />

        <motion.p
          className="text-lg text-zinc-400 leading-relaxed mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          I&apos;m currently open to full-time roles and freelance opportunities. Whether you have
          a project in mind, want to collaborate, or just want to say hello — my inbox is always
          open. The fastest way to reach me is via email, but feel free to connect on any platform
          below.
        </motion.p>

        <motion.p
          className="text-sm uppercase tracking-[0.2em] text-zinc-600 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Get in touch
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {socialLinks.map((link, i) => {
            const Icon = iconMap[link.icon];
            const label = linkLabels[link.icon] ?? link.label;
            return (
              <MagneticButton key={link.label} strength={0.25}>
                <motion.a
                  href={getHref(link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium text-zinc-400 border border-white/[0.08] hover:text-sky-400 hover:border-sky-500/30 hover:bg-sky-500/[0.05] transition-all duration-300"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.1 }}
                  aria-label={link.label}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {label}
                </motion.a>
              </MagneticButton>
            );
          })}
        </motion.div>

        <motion.p
          className="mt-12 text-sm text-zinc-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          
        </motion.p>
      </div>
    </AnimatedSection>
  );
}
