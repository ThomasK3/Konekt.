import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground - Konekt",
  description: "TripGlide design system playground",
};

export default function PlaygroundLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
