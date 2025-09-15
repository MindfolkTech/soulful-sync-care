import * as React from "react";

// SVG Shape Definitions for MindFolk Editorial Overlays
export const SvgShapeDefinitions = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }}>
    <defs>
      {/* Blobby Shape - Organic, flowing */}
      <clipPath id="clip-blobby">
        <path d="M20,80 C40,10 80,20 120,50 C150,80 130,140 90,130 C50,140 10,120 20,80 Z" />
      </clipPath>
      
      {/* Oval Shape - Soft, gentle */}
      <clipPath id="clip-oval">
        <ellipse cx="75" cy="75" rx="60" ry="45" />
      </clipPath>
      
      {/* Arch Shape - Structured, directional */}
      <clipPath id="clip-arch">
        <path d="M30,150 Q30,30 75,30 Q120,30 120,150 Z" />
      </clipPath>
      
      {/* Line Decorations */}
      <g id="line-spark">
        <path d="M0,10 L8,0 M8,20 L16,10 M16,0 L24,10" stroke="currentColor" strokeWidth="2" fill="none" />
      </g>
      
      <g id="line-wave">
        <path d="M0,10 Q8,0 16,10 T32,10" stroke="currentColor" strokeWidth="2" fill="none" />
      </g>
      
      <g id="line-bracket">
        <path d="M0,0 L0,10 L8,10 M16,10 L24,10 L24,0" stroke="currentColor" strokeWidth="2" fill="none" />
      </g>
      
      <g id="line-underline">
        <path d="M0,10 L24,10" stroke="currentColor" strokeWidth="2" fill="none" />
      </g>
    </defs>
  </svg>
);

interface SvgShapeProps {
  shape: "blobby" | "oval" | "arch";
  fillColor: string;
  className?: string;
  children?: React.ReactNode;
}

export const SvgShape: React.FC<SvgShapeProps> = ({ shape, fillColor, className = "", children }) => {
  const clipPathId = `clip-${shape}`;
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ clipPath: `url(#${clipPathId})`, backgroundColor: fillColor }}
    >
      {children}
    </div>
  );
};

interface LineDecorationProps {
  type: "spark" | "wave" | "bracket" | "underline";
  color?: string;
  className?: string;
}

export const LineDecoration: React.FC<LineDecorationProps> = ({ 
  type, 
  color = "currentColor", 
  className = "" 
}) => {
  const size = type === "wave" ? "32" : "24";
  
  return (
    <svg 
      width={size} 
      height="20" 
      className={`inline-block ${className}`}
      style={{ color }}
    >
      <use href={`#line-${type}`} />
    </svg>
  );
};