import { motion } from "motion/react";
import { type ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94], // --ease-confident
    }}
  >
    {children}
  </motion.div>
);
