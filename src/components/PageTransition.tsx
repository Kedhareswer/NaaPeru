import { motion } from "motion/react";
import { type ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.35,
      ease: [0.4, 0.0, 0.2, 1], // --ease-smooth
    }}
  >
    {children}
  </motion.div>
);
