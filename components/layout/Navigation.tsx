"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Playground", href: "/playground" },
  { name: "Test Layout", href: "/test-layout" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <Link href="/" className="text-xl md:text-2xl font-bold text-text-primary">
              Konekt.
            </Link>
            <div className="hidden md:flex gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-small font-medium transition-colors",
                    pathname === item.href
                      ? "bg-text-primary text-white"
                      : "text-text-secondary hover:bg-bg-page"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
