import { type ReactNode, type MouseEvent, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useTransition, type CarrySource } from "@/contexts/TransitionContext";

interface TransitionLinkProps {
  to: string;
  label?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TransitionLink = ({
  to,
  label,
  children,
  className,
  onClick,
}: TransitionLinkProps) => {
  const { navigateTo, state } = useTransition();
  const location = useLocation();
  const anchorRef = useRef<HTMLAnchorElement>(null);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (state !== "idle") return;
    if (to === location.pathname) return;
    onClick?.();

    let carry: CarrySource | null = null;
    const img = anchorRef.current?.querySelector("img");
    if (img && img.complete) {
      const r = img.getBoundingClientRect();
      carry = {
        rect: { left: r.left, top: r.top, width: r.width, height: r.height },
        image: img.currentSrc || img.src,
      };
    }

    navigateTo(to, label, carry);
  };

  return (
    <a ref={anchorRef} href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};
