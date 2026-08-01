"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { socialLinks } from "@/data";

function GmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0A66C2"/>
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" fill="white"/>
    </svg>
  );
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  mail:     GmailIcon,
  linkedin: LinkedInIcon,
  github:   GitHubIcon,
};

const linkLabels: Record<string, string> = {
  mail:     "Gmail",
  linkedin: "LinkedIn",
  github:   "GitHub",
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
