"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/layout/BottomNav";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { Cell } from "@/components/cells/Cell";

interface UserData {
  name: string;
  email: string;
  company: string;
  role: string;
  phone: string;
  bio: string;
  avatar: string | null;
}

interface Settings {
  emailNotifications: boolean;
  eventReminders: boolean;
  marketingEmails: boolean;
  language: string;
  timezone: string;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <span className="text-small font-medium text-text-secondary w-32 flex-shrink-0">
        {label}
      </span>
      <span className="text-text-primary">{value}</span>
    </div>
  );
}

function ProfileTab({
  userData,
  formData,
  setFormData,
  isEditing,
  setIsEditing,
  handleSave,
}: {
  userData: UserData;
  formData: UserData;
  setFormData: (data: UserData) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  handleSave: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* Avatar & Basic Info */}
      <Cell
        title="Personal Information"
        actions={
          !isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-secondary text-sm px-4 py-2"
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData({ ...userData });
                }}
                className="btn-secondary text-sm px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn-primary text-sm px-4 py-2"
              >
                Save
              </button>
            </div>
          )
        }
      >
        {isEditing ? (
          <div className="space-y-5">
            {/* Avatar Upload */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  "👤"
                )}
              </div>
              <button className="btn-secondary text-sm">Upload Photo</button>
            </div>

            {/* Name */}
            <div>
              <label className="block text-small font-medium text-text-primary mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input"
              />
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="block text-small font-medium text-text-primary mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="input bg-gray-100 cursor-not-allowed"
              />
              <p className="text-xs text-text-secondary mt-1">
                Email cannot be changed
              </p>
            </div>

            {/* Company */}
            <div>
              <label className="block text-small font-medium text-text-primary mb-2">
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="input"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-small font-medium text-text-primary mb-2">
                Role
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="input"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-small font-medium text-text-primary mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="input"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-small font-medium text-text-primary mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="textarea"
                rows={4}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Avatar Display */}
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl">
                {userData.avatar ? (
                  <img
                    src={userData.avatar}
                    alt="Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  "👤"
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary">
                  {userData.name}
                </h2>
                <p className="text-text-secondary">
                  {userData.role} at {userData.company}
                </p>
              </div>
            </div>

            {/* Info Display */}
            <InfoRow label="Email" value={userData.email} />
            <InfoRow label="Phone" value={userData.phone || "Not provided"} />
            <InfoRow label="Bio" value={userData.bio || "No bio yet"} />
          </div>
        )}
      </Cell>

      {/* Account Actions */}
      <Cell title="Account">
        <div className="space-y-3">
          <button className="btn-secondary w-full md:w-auto">
            Change Password
          </button>
        </div>
      </Cell>

      {/* Danger Zone */}
      <Cell title="Danger Zone">
        <div className="space-y-3">
          <p className="text-small text-text-secondary">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button className="btn-secondary text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
            Delete Account
          </button>
        </div>
      </Cell>
    </div>
  );
}

function SettingsTab() {
  const [settings, setSettings] = useState<Settings>({
    emailNotifications: true,
    eventReminders: true,
    marketingEmails: false,
    language: "en",
    timezone: "Europe/Prague",
  });

  const handleSave = () => {
    alert("Settings saved!");
    // TODO: Save to Supabase
    console.log("Saving settings:", settings);
  };

  return (
    <div className="space-y-6">
      {/* Notifications */}
      <Cell title="Notifications">
        <div className="space-y-4">
          <label className="flex items-start justify-between gap-4 cursor-pointer">
            <div className="flex-1">
              <p className="font-medium text-text-primary">
                Email Notifications
              </p>
              <p className="text-small text-text-secondary">
                Receive email updates about your events
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  emailNotifications: e.target.checked,
                })
              }
              className="w-5 h-5 mt-1 accent-text-primary cursor-pointer"
            />
          </label>

          <label className="flex items-start justify-between gap-4 cursor-pointer">
            <div className="flex-1">
              <p className="font-medium text-text-primary">Event Reminders</p>
              <p className="text-small text-text-secondary">
                Get reminded before your events start
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.eventReminders}
              onChange={(e) =>
                setSettings({ ...settings, eventReminders: e.target.checked })
              }
              className="w-5 h-5 mt-1 accent-text-primary cursor-pointer"
            />
          </label>

          <label className="flex items-start justify-between gap-4 cursor-pointer">
            <div className="flex-1">
              <p className="font-medium text-text-primary">Marketing Emails</p>
              <p className="text-small text-text-secondary">
                Receive tips and product updates
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.marketingEmails}
              onChange={(e) =>
                setSettings({ ...settings, marketingEmails: e.target.checked })
              }
              className="w-5 h-5 mt-1 accent-text-primary cursor-pointer"
            />
          </label>
        </div>
      </Cell>

      {/* Preferences */}
      <Cell title="Preferences">
        <div className="space-y-4">
          <div>
            <label className="block text-small font-medium text-text-primary mb-2">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) =>
                setSettings({ ...settings, language: e.target.value })
              }
              className="input"
            >
              <option value="en">English</option>
              <option value="cs">Čeština</option>
            </select>
          </div>

          <div>
            <label className="block text-small font-medium text-text-primary mb-2">
              Timezone
            </label>
            <select
              value={settings.timezone}
              onChange={(e) =>
                setSettings({ ...settings, timezone: e.target.value })
              }
              className="input"
            >
              <option value="Europe/Prague">Prague (GMT+1)</option>
              <option value="Europe/London">London (GMT+0)</option>
              <option value="America/New_York">New York (GMT-5)</option>
            </select>
          </div>
        </div>
      </Cell>

      {/* Save Button */}
      <button onClick={handleSave} className="btn-primary">
        Save Settings
      </button>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState<UserData>({
    name: "John Doe",
    email: "john@example.com",
    company: "Startup Inc.",
    role: "Event Organizer",
    phone: "+420 123 456 789",
    bio: "Passionate about connecting people and building communities.",
    avatar: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData>({ ...userData });

  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
    alert("Profile updated successfully!");
    // TODO: Save to Supabase
    console.log("Saving profile:", formData);
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      // TODO: Implement logout
      console.log("Logging out...");
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-bg-page pb-20">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-3 right-3 z-50 w-9 h-9 rounded-full bg-white shadow-button border border-border-light flex items-center justify-center"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {sidebarOpen ? (
            <>
              <line x1="5" y1="5" x2="15" y2="15" />
              <line x1="15" y1="5" x2="5" y2="15" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="17" y2="6" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="14" x2="17" y2="14" />
            </>
          )}
        </svg>
      </button>

      {/* Left Sidebar */}
      <LeftSidebar
        items={[
          { id: "profile", label: "Profile", icon: "👤" },
          { id: "settings", label: "Settings", icon: "⚙️" },
          { id: "logout", label: "Logout", icon: "🚪" },
        ]}
        activeItem={activeTab}
        onItemClick={(id) => {
          if (id === "logout") {
            handleLogout();
          } else {
            setActiveTab(id);
          }
        }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="main-content">
        <h1 className="text-h1 font-bold text-text-primary mb-6">
          {activeTab === "profile" ? "My Profile" : "Settings"}
        </h1>

        {activeTab === "profile" && (
          <ProfileTab
            userData={userData}
            formData={formData}
            setFormData={setFormData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleSave={handleSave}
          />
        )}

        {activeTab === "settings" && <SettingsTab />}
      </main>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
}
