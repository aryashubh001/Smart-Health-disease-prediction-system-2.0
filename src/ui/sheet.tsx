import React from 'react';

export const Sheet = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const SheetTrigger = ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) => <>{children}</>;
export const SheetContent = ({ children, side = 'right' }: { children: React.ReactNode; side?: 'left' | 'right' | 'top' | 'bottom' }) => <>{children}</>;
