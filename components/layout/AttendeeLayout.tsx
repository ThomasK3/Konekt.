import { AttendeeSidebar } from "./AttendeeSidebar";
import { AttendeeNav } from "./AttendeeNav";
import { TopBar } from "./TopBar";
import type { UserInfo } from "./OrganizerLayout";

export function AttendeeLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserInfo;
}) {
  return (
    <div className="min-h-screen bg-background">
      <AttendeeSidebar />
      <AttendeeNav />

      <main className="md:ml-72 mb-24 md:mb-0">
        <div className="max-w-7xl px-8 py-8">
          <TopBar user={user} settingsHref="/my-events/profile" />
          {children}
        </div>
      </main>
    </div>
  );
}
