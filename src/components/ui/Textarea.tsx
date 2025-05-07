// src/components/ui/Textarea.tsx

import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`border rounded p-2 w-full resize-none ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
