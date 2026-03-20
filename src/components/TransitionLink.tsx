import { type ReactNode, type MouseEvent } from "react";
import { useLocation } from "react-router-dom";
import { useTransition } from "@/contexts/TransitionContext";

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

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (state !== "idle") return;
    if (to === location.pathname) return;
    onClick?.();
    navigateTo(to, label);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};
