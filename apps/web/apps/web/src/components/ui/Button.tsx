import React from "react";
import classNames from "classnames";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export const Button = ({ variant = "default", className, ...props }: ButtonProps) => {
  return (
    <button
      className={classNames(
        "px-4 py-2 rounded font-medium transition",
        {
          "bg-blue-600 text-white hover:bg-blue-700": variant === "default",
          "border border-blue-600 text-blue-600 hover:bg-blue-50": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
};
