import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // MindFolk Design System Colors
        "jovial-jade": "hsl(var(--jovial-jade))",
        "garden-green": "hsl(var(--garden-green))",
        "elated-emerald": "hsl(var(--elated-emerald))",
        "warm-white": "hsl(var(--warm-white))",
        "surface": "hsl(var(--surface))",
        "surface-accent": "hsl(var(--surface-accent))",
        "text-primary": "hsl(var(--text-primary))",
        "text-secondary": "hsl(var(--text-secondary))",
        "text-muted": "hsl(var(--text-muted))",
        "text-dark": "hsl(var(--text-dark))",
        
        // Button Colors
        "btn-primary": {
          DEFAULT: "hsl(var(--btn-primary-bg))",
          foreground: "hsl(var(--btn-primary-text))",
        },
        "btn-secondary": {
          DEFAULT: "hsl(var(--btn-secondary-bg))",
          foreground: "hsl(var(--btn-secondary-text))",
        },
        "btn-accent": {
          DEFAULT: "hsl(var(--btn-accent-bg))",
          foreground: "hsl(var(--btn-accent-text))",
        },
        "btn-cta": {
          DEFAULT: "hsl(var(--btn-cta-bg))",
          foreground: "hsl(var(--btn-cta-text))",
        },
        
        // Tag Colors
        "tag-personality": {
          DEFAULT: "hsl(var(--tag-personality-bg))",
          foreground: "hsl(var(--tag-personality-text))",
        },
        "tag-modality": {
          DEFAULT: "hsl(var(--tag-modality-bg))",
          foreground: "hsl(var(--tag-modality-text))",
        },
        "tag-specialty": {
          DEFAULT: "hsl(var(--tag-specialty-bg))",
          foreground: "hsl(var(--tag-specialty-text))",
        },
        "tag-language": {
          DEFAULT: "hsl(var(--tag-language-bg))",
          foreground: "hsl(var(--tag-language-text))",
        },
        "tag-misc": {
          DEFAULT: "hsl(var(--tag-misc-bg))",
          foreground: "hsl(var(--tag-misc-text))",
        },
        
        // System Colors
        "success": {
          DEFAULT: "hsl(var(--success-bg))",
          foreground: "hsl(var(--success-text))",
        },
        "warning": {
          DEFAULT: "hsl(var(--warning-bg))",
          foreground: "hsl(var(--warning-text))",
        },
        "error": {
          DEFAULT: "hsl(var(--error-bg))",
          foreground: "hsl(var(--error-text))",
        },
        "info": {
          DEFAULT: "hsl(var(--info-bg))",
          foreground: "hsl(var(--info-text))",
        },
        
        // Shadcn compatibility
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "primary": "var(--font-primary)",
        "secondary": "var(--font-secondary)",
      },
      fontSize: {
        "xs": "var(--text-xs)",
        "sm": "var(--text-sm)",
        "base": "var(--text-base)",
        "lg": "var(--text-lg)",
        "xl": "var(--text-xl)",
        "2xl": "var(--text-2xl)",
        "3xl": "var(--text-3xl)",
      },
      spacing: {
        "touch-min": "var(--touch-target-min)",
        "touch-comfort": "var(--touch-target-comfort)",
        "xs": "var(--space-xs)",
        "sm": "var(--space-sm)",
        "md": "var(--space-md)",
        "lg": "var(--space-lg)",
        "xl": "var(--space-xl)",
        "2xl": "var(--space-2xl)",
        "6": "1.5rem", // px-6
        "8": "2rem",   // md:px-8
        "10": "2.5rem", // lg:px-10
      },
      borderRadius: {
        "sm": "var(--radius-sm)",
        "md": "var(--radius-md)",
        "lg": "var(--radius-lg)",
        "xl": "var(--radius-xl)",
        "pill": "var(--radius-pill)",
        "avatar": "var(--radius-avatar)",
        // Keep shadcn compatibility
        DEFAULT: "var(--radius)",
      },
      transitionProperty: {
        "progress": "var(--motion-progress)",
        "swipe": "var(--motion-swipe)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
