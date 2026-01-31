import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-small font-medium text-text-secondary mb-2"
          >
            {label}
            {props.required && <span className="text-data-pink ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-3 text-base font-medium border rounded-md transition-all duration-200",
            "focus:outline-none bg-white",
            error
              ? "border-data-pink text-data-pink focus:border-data-pink focus:shadow-focus"
              : "border-border-medium focus:border-black focus:shadow-focus text-black hover:border-border-dark",
            "disabled:bg-background-secondary disabled:cursor-not-allowed disabled:opacity-50",
            "placeholder:text-text-tertiary placeholder:font-regular",
            className
          )}
          {...props}
        />
        {error && <p className="mt-2 text-small text-data-pink">{error}</p>}
        {helperText && !error && (
          <p className="mt-2 text-small text-text-secondary">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
