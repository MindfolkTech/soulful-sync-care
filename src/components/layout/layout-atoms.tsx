import React from "react";

interface LayoutProps {
  className?: string;
  children: React.ReactNode;
}

// Stack (vertical)
export function Stack({ className = "", children, ...props }: LayoutProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-col gap-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

// HStack (horizontal)
export function HStack({ className = "", children, ...props }: LayoutProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-row items-center gap-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

// Cluster (wrapping chips/tags)
export function Cluster({ className = "", children, ...props }: LayoutProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-row flex-wrap gap-2 ${className}`} {...props}>
      {children}
    </div>
  );
}
