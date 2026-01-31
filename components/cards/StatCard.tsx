"use client";

import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({ value, label, icon, trend, className, ...props }: StatCardProps) {
  return (
    <div className={cn("card", className)} {...props}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-display font-bold text-text-primary leading-none mb-2">
            {value}
          </p>
          <p className="text-small text-text-secondary font-medium">
            {label}
          </p>

          {/* Trend indicator */}
          {trend && (
            <div className={cn(
              "flex items-center gap-1 mt-2 text-tiny font-semibold",
              trend.isPositive ? "text-status-success" : "text-status-error"
            )}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                {trend.isPositive ? (
                  <polyline points="3 9 6 3 9 9" />
                ) : (
                  <polyline points="3 3 6 9 9 3" />
                )}
              </svg>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>

        {/* Icon */}
        {icon && (
          <div className="w-12 h-12 rounded-md bg-bg-page flex items-center justify-center text-text-secondary flex-shrink-0">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
