"use client";

import { motion } from "framer-motion";

interface RevealCharsProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  fast?: boolean;
}

export function RevealChars({
  children,
  className = "",
  as: Tag = "span",
  delay = 0,
  stagger = 0.02,
  fast = false,
}: RevealCharsProps) {
  return (
    <Tag className={className}>
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{
            duration: fast ? 0.2 : 0.5,
            delay: (fast ? 0 : delay) + i * (fast ? 0.01 : stagger),
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  );
}
