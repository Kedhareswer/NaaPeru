/**
 * NaaPeru Design Tokens — TypeScript Type Definitions
 * =====================================================
 * Use these types when building typed components that consume
 * design tokens programmatically (e.g. inline styles, Framer Motion
 * variants, dynamic className builders).
 *
 * Generated from: design_system/brand-tokens.css + src/index.css
 */

// ─────────────────────────────────────────────────────────────────
// Color Tokens
// ─────────────────────────────────────────────────────────────────

export type BrandRedShade =
  | '50' | '100' | '200' | '300' | '400'
  | '500' | '600' | '700' | '800' | '900' | '950';

export type NeutralShade =
  | '50' | '100' | '200' | '300' | '400'
  | '500' | '600' | '700' | '800' | '900' | '950';

export type SemanticColor =
  | 'background'
  | 'foreground'
  | 'surface-subtle'
  | 'surface-elevated'
  | 'card'
  | 'card-foreground'
  | 'popover'
  | 'popover-foreground'
  | 'primary'
  | 'primary-foreground'
  | 'primary-hover'
  | 'primary-glow'
  | 'secondary'
  | 'secondary-foreground'
  | 'muted'
  | 'muted-foreground'
  | 'gray-light'
  | 'gray-dark'
  | 'accent'
  | 'accent-foreground'
  | 'destructive'
  | 'destructive-foreground'
  | 'border'
  | 'input'
  | 'ring';

export type StatusColor = 'success' | 'warning' | 'error' | 'info';

/** All CSS variable names for colors, usable as `--${ColorToken}` */
export type ColorToken = SemanticColor | StatusColor;

// ─────────────────────────────────────────────────────────────────
// Spacing Tokens
// ─────────────────────────────────────────────────────────────────

export type SpacingScale =
  | 'xs'   // 8px
  | 'sm'   // 16px
  | 'md'   // 24px
  | 'lg'   // 32px
  | 'xl'   // 48px
  | '2xl'  // 64px
  | '3xl'  // 96px
  | '4xl'; // 128px

export type SpacingValue = {
  readonly xs:  '0.5rem';   // 8px
  readonly sm:  '1rem';     // 16px
  readonly md:  '1.5rem';   // 24px
  readonly lg:  '2rem';     // 32px
  readonly xl:  '3rem';     // 48px
  readonly '2xl': '4rem';   // 64px
  readonly '3xl': '6rem';   // 96px
  readonly '4xl': '8rem';   // 128px
};

// ─────────────────────────────────────────────────────────────────
// Typography Tokens
// ─────────────────────────────────────────────────────────────────

export type FontFamily = 'heading' | 'body' | 'sanchari';

export type FontFamilyValue = {
  readonly heading:  "'Space Grotesk', sans-serif";
  readonly body:     "'Inter', sans-serif";
  readonly sanchari: "'DhurjatiItalic', 'Space Grotesk', sans-serif";
};

export type FontWeight =
  | 'light'     // 300
  | 'regular'   // 400
  | 'medium'    // 500
  | 'semibold'  // 600
  | 'bold';     // 700

export type FontWeightValue = {
  readonly light:    300;
  readonly regular:  400;
  readonly medium:   500;
  readonly semibold: 600;
  readonly bold:     700;
};

export type TypographyScale =
  | '2xs'   // 10px (0.625rem)
  | 'xs'    // 12px (0.75rem)
  | 'sm'    // 14px (0.875rem)
  | 'base'  // 16px (1rem)
  | 'lg'    // 18px (1.125rem)
  | 'xl'    // 20px (1.25rem)
  | '2xl'   // 24px (1.5rem)
  | '3xl'   // 30px (1.875rem)
  | '4xl'   // 36px (2.25rem)
  | '5xl'   // 48px (3rem)
  | '6xl'   // 60px (3.75rem)
  | '7xl'   // 72px (4.5rem)
  | '8xl';  // 96px (6rem)

export type LetterSpacing =
  | 'tight'    // -0.02em
  | 'normal'   //  0
  | 'wide'     //  0.08em
  | 'wider'    //  0.12em
  | 'widest';  //  0.35em  (micro labels)

// ─────────────────────────────────────────────────────────────────
// Shadow Tokens
// ─────────────────────────────────────────────────────────────────

export type ShadowScale = 'sm' | 'md' | 'lg' | 'glow';

export type ShadowValue = {
  readonly sm:   '0 2px 8px rgba(0,0,0,0.40)';
  readonly md:   '0 8px 32px rgba(0,0,0,0.60)';
  readonly lg:   '0 16px 48px rgba(0,0,0,0.80)';
  readonly glow: '0 0 40px rgba(255,0,0,0.30)';
};

// ─────────────────────────────────────────────────────────────────
// Motion Tokens
// ─────────────────────────────────────────────────────────────────

export type TransitionSpeed = 'fast' | 'normal' | 'slow' | 'slower';

export type TransitionDuration = {
  readonly fast:   '150ms';
  readonly normal: '300ms';
  readonly slow:   '500ms';
  readonly slower: '800ms';
};

export type EasingFunction = 'smooth' | 'bounce' | 'confident';

export type EasingValue = {
  readonly smooth:    'cubic-bezier(0.4, 0.0, 0.2, 1)';
  readonly bounce:    'cubic-bezier(0.68, -0.55, 0.265, 1.55)';
  readonly confident: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
};

export type AnimationName =
  | 'accordion-down'
  | 'accordion-up'
  | 'fade-in'
  | 'fade-out'
  | 'slide-up'
  | 'scale-in'
  | 'glow-pulse'
  | 'float'
  | 'progress'
  | 'ticker';

// ─────────────────────────────────────────────────────────────────
// Border Radius Tokens
// ─────────────────────────────────────────────────────────────────

export type RadiusToken = 'none' | 'sm' | 'md' | 'lg' | 'full';

// ─────────────────────────────────────────────────────────────────
// Component Tokens
// ─────────────────────────────────────────────────────────────────

export interface ButtonVariant {
  variant: 'primary' | 'ghost' | 'destructive';
  size: 'sm' | 'md' | 'lg';
}

export interface CardTokens {
  background: string;
  border: string;
  hoverBackground: string;
  hoverBorder: string;
  padding: string;
  borderRadius: string;
}

export interface NavigationTokens {
  heightDefault: '96px';
  heightCompact: '80px';
  collapseBreakpoint: 768;
  scrollThreshold: 100;
}

// ─────────────────────────────────────────────────────────────────
// Tailwind CSS Class Patterns
// (Useful for typed className builders with clsx/tailwind-merge)
// ─────────────────────────────────────────────────────────────────

/** Standard card class string */
export type CardClassName =
  'border border-border/25 bg-card/40 p-6 transition-colors hover:border-primary/40 hover:bg-card/60';

/** Section label class string */
export type SectionLabelClassName =
  'font-body text-xs uppercase tracking-[0.35em] text-primary/70';

/** Primary button class string */
export type PrimaryButtonClassName =
  'inline-flex items-center gap-2 px-6 py-3 bg-primary text-background font-body text-sm font-bold uppercase tracking-[0.3em] hover:bg-primary/90 transition-colors';

/** Ghost button class string */
export type GhostButtonClassName =
  'inline-flex items-center gap-2 px-6 py-3 border border-border/25 text-foreground font-body text-sm uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-colors';

/** Container class string */
export type ContainerClassName =
  'max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20';

// ─────────────────────────────────────────────────────────────────
// Project Data Shape (public/projects.json)
// ─────────────────────────────────────────────────────────────────

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github: string | null;
  demo: string | null;
  category: string;
  project_date: string;
  image: string;
  featured: boolean;
  created_at: string;
  objectives: string[];
  outcomes: string[];
}

// ─────────────────────────────────────────────────────────────────
// Full Token Map (for runtime token lookup)
// ─────────────────────────────────────────────────────────────────

export interface DesignTokens {
  color: {
    brand: Record<BrandRedShade, string>;
    neutral: Record<NeutralShade, string>;
    semantic: Record<SemanticColor, string>;
    status: Record<StatusColor, string>;
  };
  spacing: SpacingValue;
  typography: {
    fontFamily: FontFamilyValue;
    fontWeight: FontWeightValue;
    scale: Record<TypographyScale, string>;
    letterSpacing: Record<LetterSpacing, string>;
  };
  shadow: ShadowValue;
  motion: {
    duration: TransitionDuration;
    easing: EasingValue;
  };
  radius: Record<RadiusToken, string>;
}
