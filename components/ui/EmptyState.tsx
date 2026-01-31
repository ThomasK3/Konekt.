"use client";

import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

/**
 * EmptyState - Placeholder for empty content (TripGlide Style)
 *
 * Displays a message when there's no content to show, with optional action button.
 */
export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-6 text-center",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mb-4 text-6xl opacity-20">
          {icon}
        </div>
      )}
      <h3 className="text-h3 font-semibold text-text-primary mb-2">
        {title}
      </h3>
      <p className="text-base text-text-secondary mb-6 max-w-md">
        {description}
      </p>
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
}
