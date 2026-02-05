"use client";

import { useState } from "react";
import { Cell } from "@/components/cells/Cell";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatCard } from "@/components/cards/StatCard";

interface Participant {
  id: string;
  name: string;
  email: string;
  company?: string;
  role?: string;
  status: "registered" | "checked-in" | "cancelled";
  checkedInAt?: string | null;
}

interface ParticipantsTabProps {
  eventId: string;
}

const mockParticipants: Participant[] = [
  {
    id: "1",
    name: "Jane Smith",
    email: "jane@example.com",
    company: "TechStart Inc.",
    role: "CEO",
    status: "checked-in",
    checkedInAt: "2026-03-15T18:05:00Z",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    company: "Innovate Labs",
    role: "CTO",
    status: "registered",
    checkedInAt: null,
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob@example.com",
    company: "Startup Hub",
    role: "Product Manager",
    status: "registered",
    checkedInAt: null,
  },
  {
    id: "4",
    name: "Alice Johnson",
    email: "alice@example.com",
    company: "Growth Co.",
    role: "Marketing Lead",
    status: "checked-in",
    checkedInAt: "2026-03-15T18:12:00Z",
  },
  {
    id: "5",
    name: "Mike Brown",
    email: "mike@example.com",
    company: "Dev Studio",
    role: "Developer",
    status: "cancelled",
    checkedInAt: null,
  },
];

function StatusBadge({ status }: { status: string }) {
  const styles = {
    registered: "bg-blue-100 text-blue-700 border-blue-200",
    "checked-in": "bg-green-100 text-green-700 border-green-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
  };

  const icons = {
    registered: "📝",
    "checked-in": "✅",
    cancelled: "❌",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium border ${
        styles[status as keyof typeof styles] || ""
      }`}
    >
      {icons[status as keyof typeof icons]} {status}
    </span>
  );
}

export default function ParticipantsTab({ eventId }: ParticipantsTabProps) {
  const [participants] = useState<Participant[]>(mockParticipants);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "registered" | "checked-in" | "cancelled"
  >("all");

  // Filter logic
  const filteredParticipants = participants.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.company &&
        p.company.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "all" || p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Stats
  const stats = {
    total: participants.length,
    registered: participants.filter((p) => p.status === "registered").length,
    checkedIn: participants.filter((p) => p.status === "checked-in").length,
    cancelled: participants.filter((p) => p.status === "cancelled").length,
  };

  // Export CSV
  const handleExport = () => {
    const csv = [
      ["Name", "Email", "Company", "Role", "Status", "Checked In At"],
      ...filteredParticipants.map((p) => [
        p.name,
        p.email,
        p.company || "",
        p.role || "",
        p.status,
        p.checkedInAt || "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `participants-${eventId}-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-h2 font-bold text-text-primary">
          Participants ({filteredParticipants.length})
        </h2>
        <button
          onClick={handleExport}
          className="btn-secondary"
          disabled={filteredParticipants.length === 0}
        >
          📥 Export CSV
        </button>
      </div>

      {/* Filters */}
      <Cell>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or company..."
              className="input"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value as
                  | "all"
                  | "registered"
                  | "checked-in"
                  | "cancelled"
              )
            }
            className="input md:w-56"
          >
            <option value="all">All Status</option>
            <option value="registered">Registered</option>
            <option value="checked-in">Checked In</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </Cell>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-border-light text-center">
          <p className="text-2xl font-bold text-text-primary mb-1">
            {stats.total}
          </p>
          <p className="text-small font-medium text-text-secondary uppercase tracking-wide">
            Total
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-border-light text-center">
          <p className="text-2xl font-bold text-text-primary mb-1">
            {stats.registered}
          </p>
          <p className="text-small font-medium text-text-secondary uppercase tracking-wide">
            Registered
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-border-light text-center">
          <p className="text-2xl font-bold text-text-primary mb-1">
            {stats.checkedIn}
          </p>
          <p className="text-small font-medium text-text-secondary uppercase tracking-wide">
            Checked In
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-border-light text-center">
          <p className="text-2xl font-bold text-text-primary mb-1">
            {stats.cancelled}
          </p>
          <p className="text-small font-medium text-text-secondary uppercase tracking-wide">
            Cancelled
          </p>
        </div>
      </div>

      {/* Participants Table */}
      <Cell>
        {filteredParticipants.length === 0 ? (
          <EmptyState
            icon="👥"
            title="No participants found"
            description={
              searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "No one has registered yet"
            }
          />
        ) : (
          <div className="overflow-x-auto -mx-6 md:-mx-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-light">
                  <th className="text-left py-3 px-4 text-small font-semibold text-text-secondary">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-small font-semibold text-text-secondary">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-small font-semibold text-text-secondary hidden md:table-cell">
                    Company
                  </th>
                  <th className="text-left py-3 px-4 text-small font-semibold text-text-secondary">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-small font-semibold text-text-secondary hidden md:table-cell">
                    Checked In
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.map((participant) => (
                  <tr
                    key={participant.id}
                    className="border-b border-border-light hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <p className="font-medium text-text-primary">
                        {participant.name}
                      </p>
                      <p className="text-small text-text-secondary md:hidden">
                        {participant.company}
                      </p>
                    </td>
                    <td className="py-3 px-4 text-small text-text-secondary">
                      {participant.email}
                    </td>
                    <td className="py-3 px-4 text-small text-text-secondary hidden md:table-cell">
                      {participant.company || "-"}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={participant.status} />
                    </td>
                    <td className="py-3 px-4 text-small text-text-secondary hidden md:table-cell">
                      {participant.checkedInAt
                        ? new Date(participant.checkedInAt).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Cell>
    </div>
  );
}
