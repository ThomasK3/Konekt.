"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Cell } from "@/components/cells/Cell";
import { Button } from "@/components/ui/Button";
import { getEventById, registerForEvent, Event } from "@/lib/mockEventsStore";

export default function RegisterPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const eventData = getEventById(params.id);
    if (!eventData) {
      router.push("/events");
      return;
    }
    setEvent(eventData);
  }, [params.id, router]);

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Register participant
    const registration = registerForEvent(params.id, {
      name: formData.name,
      email: formData.email,
      company: formData.company || undefined,
      role: formData.role || undefined,
    });

    if (!registration) {
      alert("Registration failed. Event may be full.");
      setIsSubmitting(false);
      return;
    }

    // Store registration in localStorage for "My Events"
    try {
      const myRegistrations = JSON.parse(
        localStorage.getItem("myRegistrations") || "[]"
      );
      myRegistrations.push({
        eventId: params.id,
        participantId: registration.id,
        registeredAt: new Date().toISOString(),
      });
      localStorage.setItem("myRegistrations", JSON.stringify(myRegistrations));
    } catch (error) {
      console.error("Error saving registration:", error);
    }

    // Simulate delay
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to My Events with success message
      router.push(`/my-events/${params.id}?registered=true`);
    }, 1000);
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-bg-page flex items-center justify-center">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-page">
      {/* Header */}
      <header className="bg-white border-b border-border-light sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label="Go back"
          >
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
              <path d="M12 5L7 10L12 15" />
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-text-primary">
              Register for Event
            </h1>
            <p className="text-sm text-text-secondary truncate">{event.name}</p>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-2xl mx-auto px-6 py-8">
        <Cell>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`input ${errors.name ? "border-red-500" : ""}`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`input ${errors.email ? "border-red-500" : ""}`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Company Field */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="input"
                placeholder="Your Company"
              />
            </div>

            {/* Role Field */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Role
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="input"
                placeholder="Your Role"
              />
            </div>

            {/* Info Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <p className="text-small text-blue-800">
                💡 You'll receive a QR code after registration for quick
                check-in at the event.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full py-3"
              >
                {isSubmitting ? "Registering..." : "Complete Registration"}
              </Button>
            </div>
          </form>
        </Cell>

        <p className="text-xs text-text-secondary text-center mt-6">
          By registering, you agree to receive event updates via email
        </p>
      </main>
    </div>
  );
}
