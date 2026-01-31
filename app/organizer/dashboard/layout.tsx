import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Konekt",
  description: "Organizer dashboard for event management",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
