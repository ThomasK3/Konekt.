"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/layout/BottomNav";
import { Cell } from "@/components/cells/Cell";
import { Button } from "@/components/ui/Button";

interface ProfileData {
  name: string;
  email: string;
  company: string;
  role: string;
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex justify-between py-2 border-b border-border-light last:border-0">
      <span className="text-text-secondary">{label}</span>
      <span className="font-medium text-text-primary">{value}</span>
    </div>
  );
}

export default function AttendeeProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    company: "",
    role: "",
  });
  const [registrationCount, setRegistrationCount] = useState(0);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem("attendeeProfile");
    if (saved) {
      setProfileData(JSON.parse(saved));
    }

    // Get registration count
    try {
      const registrations = JSON.parse(
        localStorage.getItem("myRegistrations") || "[]"
      );
      setRegistrationCount(registrations.length);
    } catch (error) {
      console.error("Error loading registrations:", error);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("attendeeProfile", JSON.stringify(profileData));
    setIsEditing(false);
    alert("Profile updated!");
  };

  const handleCancel = () => {
    const saved = localStorage.getItem("attendeeProfile");
    if (saved) {
      setProfileData(JSON.parse(saved));
    }
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-bg-page pb-20">
      {/* Header */}
      <header className="bg-white border-b border-border-light">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-text-primary">My Profile</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        {/* Avatar & Name */}
        <Cell>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-4xl mx-auto mb-4">
              {profileData.name
                ? profileData.name.charAt(0).toUpperCase()
                : "?"}
            </div>
            <h2 className="text-2xl font-bold text-text-primary">
              {profileData.name || "Guest"}
            </h2>
            {(profileData.role || profileData.company) && (
              <p className="text-text-secondary mt-1">
                {profileData.role && profileData.company
                  ? `${profileData.role} at ${profileData.company}`
                  : profileData.role || profileData.company}
              </p>
            )}
          </div>
        </Cell>

        {/* Personal Information */}
        <Cell
          title="Personal Information"
          actions={
            !isEditing ? (
              <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleSave}>
                  Save
                </Button>
              </div>
            )
          }
        >
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  className="input"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="input"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={profileData.company}
                  onChange={(e) =>
                    setProfileData({ ...profileData, company: e.target.value })
                  }
                  className="input"
                  placeholder="Your company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Role
                </label>
                <input
                  type="text"
                  value={profileData.role}
                  onChange={(e) =>
                    setProfileData({ ...profileData, role: e.target.value })
                  }
                  className="input"
                  placeholder="Your role"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-0">
              <InfoRow label="Name" value={profileData.name || "Not set"} />
              <InfoRow label="Email" value={profileData.email || "Not set"} />
              <InfoRow
                label="Company"
                value={profileData.company || "Not set"}
              />
              <InfoRow label="Role" value={profileData.role || "Not set"} />
            </div>
          )}
        </Cell>

        {/* My Activity */}
        <Cell title="My Activity">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">
                  Registered Events
                </p>
                <p className="text-sm text-text-secondary">
                  {registrationCount}{" "}
                  {registrationCount === 1 ? "event" : "events"}
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => router.push("/my-events")}
              >
                View All
              </Button>
            </div>
          </div>
        </Cell>

        {/* Quick Actions */}
        <Cell title="Quick Actions">
          <div className="space-y-3">
            <button
              onClick={() => router.push("/events")}
              className="btn-secondary w-full text-left px-4 py-3 flex items-center justify-between"
            >
              <span>Discover Events</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 5L12 10L7 15" />
              </svg>
            </button>
            <button
              onClick={() => router.push("/my-events")}
              className="btn-secondary w-full text-left px-4 py-3 flex items-center justify-between"
            >
              <span>My Events</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 5L12 10L7 15" />
              </svg>
            </button>
          </div>
        </Cell>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-center">
          <p className="text-sm text-blue-800">
            💡 Tip: Complete your profile to make networking easier at events
          </p>
        </div>
      </main>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
}
