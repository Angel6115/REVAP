// src/components/ui/input.tsx
import * as React from "react";

// Esta interfaz puede extenderse más adelante si se necesitan props adicionales
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={`border border-gray-300 rounded px-3 py-2 w-full ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
