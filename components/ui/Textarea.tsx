import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  showCharCount?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      id,
      maxLength,
      showCharCount,
      value,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const currentLength = value?.toString().length || 0;

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
        <textarea
          ref={ref}
          id={inputId}
          maxLength={maxLength}
          value={value}
          className={cn(
            "w-full px-4 py-3 text-base font-medium border rounded-md transition-all duration-200 resize-none",
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
        <div className="flex justify-between items-center mt-2">
          <div>
            {error && <p className="text-small text-data-pink">{error}</p>}
            {helperText && !error && (
              <p className="text-small text-text-secondary">{helperText}</p>
            )}
          </div>
          {showCharCount && maxLength && (
            <p className="text-small text-text-secondary">
              {currentLength} / {maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
