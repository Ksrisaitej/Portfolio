"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionLabelProps {
  number: string;
  children: ReactNode;
}

export function SectionLabel({ number, children }: SectionLabelProps) {
  return (
    <motion.div
      className="section-label"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      [{number}] — {children}
    </motion.div>
  );
}
