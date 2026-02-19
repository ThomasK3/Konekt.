import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-xl bg-input border border-transparent px-4 text-darkblue font-medium placeholder:text-darkblue/40 transition-all focus:outline-none focus:ring-2 focus:ring-coral/20 focus:bg-surface",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";

export { Input };
