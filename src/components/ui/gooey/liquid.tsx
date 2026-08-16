import React from "react";
import {
  Liquid as BaseLiquid,
  LiquidItemProps,
  LiquidProps,
} from "liquid-gooey";

/**
 * Theming for the liquid surface. Fills use CSS variables so the goo follows
 * the archive kit-stage tokens (dark, like the rest of the portfolio);
 * shadows are dark-theme elevation with a faint light inner ring.
 * (The lib parses the shadow string, so it can't take a CSS variable.)
 */
export const LIQUID_THEME = {
  fills: {
    surface: "hsl(var(--surface-subtle))",
    elevated: "hsl(var(--surface-elevated))",
    primary: "hsl(var(--primary))",
  },
  shadows: {
    soft: "0 2px 10px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.06) inset",
    floating: "0 4px 20px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.07) inset",
  },
} as const;

export interface ThemedLiquidProps extends LiquidProps {
  variant?: keyof typeof LIQUID_THEME.fills;
}

export const Liquid = React.forwardRef<HTMLDivElement, ThemedLiquidProps>(
  ({ variant = "elevated", fill, shadow, children, ...props }, ref) => (
    <BaseLiquid
      ref={ref}
      fill={fill ?? LIQUID_THEME.fills[variant]}
      shadow={shadow ?? LIQUID_THEME.shadows.soft}
      {...props}
    >
      {children}
    </BaseLiquid>
  )
) as unknown as typeof BaseLiquid & { Item: typeof BaseLiquid.Item };

Liquid.displayName = "Liquid";
Liquid.Item = BaseLiquid.Item;

export type { LiquidItemProps, LiquidProps };
