import React from 'react';

export const Separator = ({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`shrink-0 bg-border h-px w-full ${className}`} {...props} />
);
