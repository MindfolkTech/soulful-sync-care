import React from 'react';

// Decorative SVG shapes for editorial design
export const FloatingCircle = ({ className = "", color = "tag-personality" }: { className?: string; color?: string }) => (
  <div className={`absolute w-12 h-12 rounded-full bg-${color}/20 blur-sm ${className}`} />
);

export const GeometricTriangle = ({ className = "", color = "garden-green" }: { className?: string; color?: string }) => (
  <div 
    className={`absolute w-8 h-8 ${className}`}
    style={{
      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
      backgroundColor: `hsl(var(--${color}))`
    }}
  />
);

export const EditorialLine = ({ className = "", orientation = "horizontal" }: { className?: string; orientation?: 'horizontal' | 'vertical' | 'diagonal' }) => {
  const getLineStyles = () => {
    switch (orientation) {
      case 'vertical':
        return { width: '2px', height: '60px', backgroundColor: 'hsl(var(--garden-green))' };
      case 'diagonal':
        return { 
          width: '80px', 
          height: '2px', 
          backgroundColor: 'hsl(var(--garden-green))',
          transform: 'rotate(45deg)'
        };
      default:
        return { width: '60px', height: '2px', backgroundColor: 'hsl(var(--garden-green))' };
    }
  };

  return <div className={`absolute ${className}`} style={getLineStyles()} />;
};

export const PlayfulDots = ({ className = "" }: { className?: string }) => (
  <div className={`absolute flex space-x-1 ${className}`}>
    <div className="w-2 h-2 rounded-full bg-tag-personality/60" />
    <div className="w-2 h-2 rounded-full bg-tag-modality/60" />
    <div className="w-2 h-2 rounded-full bg-tag-specialty/60" />
  </div>
);

export const EditorialQuote = ({ className = "" }: { className?: string }) => (
  <div className={`absolute text-6xl font-primary text-garden-green/10 select-none ${className}`}>
    "
  </div>
);

export const MagazineAccent = ({ className = "", variant = "corner" }: { className?: string; variant?: 'corner' | 'side' | 'floating' }) => {
  const getAccentStyles = () => {
    switch (variant) {
      case 'side':
        return 'w-1 h-20 bg-gradient-to-b from-garden-green to-tag-personality';
      case 'floating':
        return 'w-16 h-16 rounded-full bg-gradient-to-br from-tag-personality/30 to-tag-modality/30 blur-lg';
      default:
        return 'w-8 h-8 bg-garden-green/20 transform rotate-45';
    }
  };

  return <div className={`absolute ${getAccentStyles()} ${className}`} />;
};