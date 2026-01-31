"use client";

import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CellProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  hover?: boolean;
}

/**
 * Cell - Simple White Card Component (TripGlide Style)
 *
 * Minimalistic white card with subtle shadows and clean layout.
 */
export function Cell({
  title,
  subtitle,
  icon,
  actions,
  footer,
  hover = false,
  children,
  className,
  ...props
}: CellProps) {
  return (
    <div
      className={cn(
        "card",
        hover && "cursor-pointer",
        className
      )}
      {...props}
    >
      {/* Header */}
      {(title || icon || actions) && (
        <div className="flex flex-wrap items-start gap-3 mb-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Icon */}
            {icon && (
              <div className="w-12 h-12 rounded-md flex items-center justify-center flex-shrink-0 bg-bg-page transition-transform hover:scale-105">
                {icon}
              </div>
            )}

            {/* Title & Subtitle */}
            <div className="flex-1 min-w-0">
              {title && (
                <h3 className="text-h3 font-semibold text-text-primary leading-tight">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-small text-text-secondary mt-1">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          {actions && <div className="flex-shrink-0 w-full sm:w-auto sm:ml-auto">{actions}</div>}
        </div>
      )}

      {/* Content */}
      {children && (
        <div className="text-base text-text-primary leading-normal">
          {children}
        </div>
      )}

      {/* Footer */}
      {footer && (
        <div className="mt-4 pt-4 border-t border-border-light">
          {footer}
        </div>
      )}
    </div>
  );
}
