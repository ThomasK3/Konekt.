import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-bold transition-all active:scale-95 hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-warm text-white rounded-full shadow-glow hover:shadow-float",
        secondary:
          "bg-darkblue/5 text-darkblue rounded-full",
        ghost:
          "bg-transparent text-coral rounded-full",
      },
      size: {
        sm: "h-9 px-5 text-sm",
        md: "h-11 px-7 text-base",
        lg: "h-14 px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);

Button.displayName = "Button";

export { Button, buttonVariants };
