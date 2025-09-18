import * as React from "react";

interface DecorativeShapesProps {
  className?: string;
  variant?: "abstract" | "lines" | "dots";
}

export function DecorativeShapes({ className = "", variant = "abstract" }: DecorativeShapesProps) {
  if (variant === "abstract") {
    return (
      <svg
        className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="20" fill="hsl(var(--jovial-jade))" opacity="0.1" />
        <path
          d="M300 80c20 0 40 15 40 35s-20 35-40 35-40-15-40-35 20-35 40-35z"
          fill="hsl(var(--garden-green))" 
          opacity="0.08"
        />
        <circle cx="350" cy="200" r="15" fill="hsl(var(--tag-personality))" opacity="0.12" />
        <path
          d="M80 250c15-10 30-5 45 5s20 25 10 40-30 15-45 5-20-25-10-40z"
          fill="hsl(var(--tag-modality))" 
          opacity="0.1"
        />
      </svg>
    );
  }

  if (variant === "lines") {
    return (
      <svg
        className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M50 100c50-20 100 10 150-5s80-30 120-10"
          stroke="hsl(var(--jovial-jade))"
          strokeWidth="2"
          opacity="0.2"
          fill="none"
        />
        <path
          d="M30 180c40 15 80-10 120 5s70 20 100 0"
          stroke="hsl(var(--garden-green))"
          strokeWidth="1.5"
          opacity="0.15"
          fill="none"
        />
      </svg>
    );
  }

  return null;
}
