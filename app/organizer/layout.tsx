import { OrganizerLayout } from "@/components/layout/OrganizerLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <OrganizerLayout>{children}</OrganizerLayout>;
}
