import React from 'react';

export const Alert = ({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7 ${className}`} {...props} />
);

export const AlertDescription = ({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`text-sm [&_p]:leading-relaxed ${className}`} {...props} />
);
