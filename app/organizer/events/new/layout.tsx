import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Event - Konekt.",
  description: "Create a new event",
};

export default function CreateEventLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
