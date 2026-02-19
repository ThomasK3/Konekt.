import { LeftSidebar } from "./LeftSidebar";
import { BottomNav } from "./BottomNav";
import { TopBar } from "./TopBar";

export interface UserInfo {
  name: string | null;
  email: string | null;
}

export function OrganizerLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserInfo;
}) {
  return (
    <div className="min-h-screen bg-background">
      <LeftSidebar />
      <BottomNav />

      {/* Main content area */}
      <main className="md:ml-72 mb-24 md:mb-0">
        <div className="max-w-7xl px-8 py-8">
          <TopBar user={user} />
          {children}
        </div>
      </main>
    </div>
  );
}
