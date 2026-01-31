"use client";

import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface EventCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt?: string;
  meta?: ReactNode;
  onFavorite?: () => void;
  isFavorited?: boolean;
}

/**
 * EventCard - Image-first card with dark overlay (TripGlide Style)
 *
 * Features:
 * - Event photo with dark gradient overlay
 * - Text overlay with shadow for readability
 * - Floating favorite button
 * - Meta information below image
 */
export function EventCard({
  title,
  subtitle,
  imageSrc,
  imageAlt = "",
  meta,
  onFavorite,
  isFavorited = false,
  className,
  ...props
}: EventCardProps) {
  return (
    <div className={cn("event-card", className)} {...props}>
      {/* Image with overlay */}
      <div className="event-card-image">
        <Image
          src={imageSrc}
          alt={imageAlt || title}
          fill
          className="object-cover"
        />

        {/* Favorite button */}
        {onFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite();
            }}
            className={cn(
              "absolute top-4 right-4 z-10",
              "w-10 h-10 rounded-full",
              "bg-white/90 backdrop-blur-sm",
              "flex items-center justify-center",
              "shadow-icon transition-all hover:scale-110 hover:bg-white",
              isFavorited && "text-status-error"
            )}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill={isFavorited ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10 17.5l-6.25-6.25c-1.667-1.667-1.667-4.375 0-6.042 1.667-1.666 4.375-1.666 6.042 0L10 5.417l.208-.209c1.667-1.666 4.375-1.666 6.042 0 1.667 1.667 1.667 4.375 0 6.042L10 17.5z" />
            </svg>
          </button>
        )}

        {/* Text over image */}
        <div className="event-card-image-content">
          <h3 className="event-card-title">{title}</h3>
          {subtitle && <p className="event-card-subtitle">{subtitle}</p>}
        </div>
      </div>

      {/* Card body (meta information) */}
      {meta && <div className="event-card-body">{meta}</div>}
    </div>
  );
}
