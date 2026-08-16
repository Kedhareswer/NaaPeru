import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Standard case-study content section: portfolio container, bottom rhythm,
 * and the left offset that clears the fixed sticky sidebar on large screens.
 */
export function CaseStudySection({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("container-portfolio mb-20 lg:ml-64", className)}>
      {children}
    </section>
  );
}
