import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "icon";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      icon: "btn-icon",
    };

    const sizes = {
      sm: "px-5 py-2.5 text-small",
      md: "px-7 py-3.5 text-base",
      lg: "px-9 py-4 text-large",
    };

    // Icon variant doesn't use size classes
    const sizeClass = variant === "icon" ? "" : sizes[size];

    return (
      <button
        ref={ref}
        className={cn(
          variants[variant],
          sizeClass,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
