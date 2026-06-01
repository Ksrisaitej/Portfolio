"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AccentHeadingProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function AccentHeading({
  children,
  as: Tag = "h2",
  className = "",
}: AccentHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Tag className={className}>{children}</Tag>
    </motion.div>
  );
}

export function Accent({ children }: { children: ReactNode }) {
  return <em className="accent-italic">{children}</em>;
}
