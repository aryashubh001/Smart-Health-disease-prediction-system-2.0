import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void;
}

export const Select = ({ children, onValueChange, ...props }: SelectProps) => (
  <select
    {...props}
    onChange={(e) => onValueChange?.(e.target.value)}
    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {children}
  </select>
);

export const SelectTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const SelectItem = ({ children, ...props }: React.OptionHTMLAttributes<HTMLOptionElement>) => (
  <option {...props}>{children}</option>
);
export const SelectValue = ({ children, placeholder }: { children?: React.ReactNode; placeholder?: string }) => (
  <span>{children || placeholder}</span>
);
