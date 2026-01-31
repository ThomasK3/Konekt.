import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test Layout - Konekt",
  description: "Test layout page for navigation system",
};

export default function TestLayoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
