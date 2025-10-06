import React from 'react';

interface SheetProps {
  children: React.ReactNode;
}

interface SheetContentProps extends SheetProps {
  side?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
}

export const Sheet = ({ children }: SheetProps) => <>{children}</>;
export const SheetTrigger = ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) => <>{children}</>;
export const SheetContent = ({ children, side = 'right', className = '' }: SheetContentProps) => (
  <div className={className}>{children}</div>
);
