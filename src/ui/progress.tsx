import React from 'react';

export const Progress = ({ value = 0, className = '', ...props }: React.HTMLAttributes<HTMLDivElement> & { value?: number }) => (
  <div className={`relative w-full overflow-hidden rounded-full bg-secondary h-2 ${className}`} {...props}>
    <div
      className="h-full bg-primary transition-all"
      style={{ width: `${value}%` }}
    />
  </div>
);
