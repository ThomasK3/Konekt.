"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { createEvent } from "@/lib/mockEventsStore";

interface FormData {
  name: string;
  date: string;
  time: string;
  description: string;
  coverImage: File | null;
  location: string;
  capacity: string;
  visibility: "public" | "private" | "invite-only";
}

interface FormErrors {
  name?: string;
  date?: string;
  time?: string;
  location?: string;
  capacity?: string;
}

export default function CreateEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    date: "",
    time: "",
    description: "",
    coverImage: null,
    location: "",
    capacity: "",
    visibility: "public",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Event name is required";
    }

    if (!formData.date) {
      newErrors.date = "Event date is required";
    }

    if (!formData.time) {
      newErrors.time = "Event time is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.capacity) {
      newErrors.capacity = "Capacity is required";
    } else if (parseInt(formData.capacity) < 1) {
      newErrors.capacity = "Capacity must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    if (!isDraft && !validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert cover image to data URL for storage (mock)
      let coverImageUrl: string | undefined;
      if (formData.coverImage) {
        coverImageUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(formData.coverImage!);
        });
      }

      // Create the event
      const newEvent = createEvent({
        name: formData.name.trim(),
        date: formData.date,
        time: formData.time,
        location: formData.location.trim(),
        description: formData.description.trim(),
        coverImage: coverImageUrl,
        capacity: parseInt(formData.capacity),
        visibility: formData.visibility,
        status: isDraft ? "draft" : "published",
      });

      console.log("Event created successfully:", newEvent.id);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Show success message
      if (isDraft) {
        alert("Event saved as draft!");
      } else {
        alert("Event created successfully!");
      }

      // Redirect to the newly created event detail page
      router.push(`/organizer/events/${newEvent.id}`);
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      {/* Main Content - Full Width (No Sidebar) */}
      <div className="ml-0 mr-6 mt-6 mb-40 px-6 md:ml-6 md:mr-6 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-h1 font-bold text-text-primary mb-2">
              Create New Event
            </h1>
            <p className="text-base text-text-secondary">
              Fill in the details below to create your event
            </p>
          </div>

          <div className="space-y-6">
            {/* Card 1: Event Basics */}
            <div className="card">
              <h2 className="text-h3 font-semibold text-text-primary mb-6">
                Event Basics
              </h2>

              <div className="space-y-5">
                {/* Event Name */}
                <div>
                  <label className="block text-small font-medium text-text-secondary mb-2">
                    Event Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) {
                        setErrors({ ...errors, name: undefined });
                      }
                    }}
                    placeholder="e.g., Prague Tech Meetup"
                    className={`input ${errors.name ? "error" : ""}`}
                  />
                  {errors.name && (
                    <p className="text-small text-status-error mt-1.5">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-small font-medium text-text-secondary mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => {
                        setFormData({ ...formData, date: e.target.value });
                        if (errors.date) {
                          setErrors({ ...errors, date: undefined });
                        }
                      }}
                      className={`input ${errors.date ? "error" : ""}`}
                    />
                    {errors.date && (
                      <p className="text-small text-status-error mt-1.5">
                        {errors.date}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-small font-medium text-text-secondary mb-2">
                      Time *
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => {
                        setFormData({ ...formData, time: e.target.value });
                        if (errors.time) {
                          setErrors({ ...errors, time: undefined });
                        }
                      }}
                      className={`input ${errors.time ? "error" : ""}`}
                    />
                    {errors.time && (
                      <p className="text-small text-status-error mt-1.5">
                        {errors.time}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-small font-medium text-text-secondary mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Tell attendees what your event is about..."
                    className="textarea"
                  />
                </div>

                {/* Cover Image */}
                <div>
                  <label className="block text-small font-medium text-text-secondary mb-2">
                    Cover Image
                  </label>
                  <ImageUpload
                    value={formData.coverImage}
                    onChange={(file) =>
                      setFormData({ ...formData, coverImage: file })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Event Details */}
            <div className="card">
              <h2 className="text-h3 font-semibold text-text-primary mb-6">
                Event Details
              </h2>

              <div className="space-y-5">
                {/* Location */}
                <div>
                  <label className="block text-small font-medium text-text-secondary mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => {
                      setFormData({ ...formData, location: e.target.value });
                      if (errors.location) {
                        setErrors({ ...errors, location: undefined });
                      }
                    }}
                    placeholder="e.g., Impact Hub Prague, Karlín"
                    className={`input ${errors.location ? "error" : ""}`}
                  />
                  {errors.location && (
                    <p className="text-small text-status-error mt-1.5">
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-small font-medium text-text-secondary mb-2">
                    Capacity *
                  </label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => {
                      setFormData({ ...formData, capacity: e.target.value });
                      if (errors.capacity) {
                        setErrors({ ...errors, capacity: undefined });
                      }
                    }}
                    placeholder="e.g., 50"
                    min="1"
                    className={`input ${errors.capacity ? "error" : ""}`}
                  />
                  {errors.capacity && (
                    <p className="text-small text-status-error mt-1.5">
                      {errors.capacity}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Card 3: Settings */}
            <div className="card">
              <h2 className="text-h3 font-semibold text-text-primary mb-6">
                Settings
              </h2>

              <div>
                <label className="block text-small font-medium text-text-secondary mb-3">
                  Event Visibility *
                </label>
                <div className="space-y-3">
                  {/* Public Option */}
                  <label className="flex items-start gap-3 p-4 rounded-lg border-2 border-border-light cursor-pointer transition-all hover:border-text-primary has-[:checked]:border-text-primary has-[:checked]:bg-bg-page">
                    <input
                      type="radio"
                      name="visibility"
                      value="public"
                      checked={formData.visibility === "public"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          visibility: e.target.value as FormData["visibility"],
                        })
                      }
                      className="mt-0.5 w-5 h-5 accent-text-primary"
                    />
                    <div className="flex-1">
                      <p className="text-base font-semibold text-text-primary mb-1">
                        Public
                      </p>
                      <p className="text-small text-text-secondary">
                        Anyone can discover and register for this event
                      </p>
                    </div>
                  </label>

                  {/* Private Option */}
                  <label className="flex items-start gap-3 p-4 rounded-lg border-2 border-border-light cursor-pointer transition-all hover:border-text-primary has-[:checked]:border-text-primary has-[:checked]:bg-bg-page">
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      checked={formData.visibility === "private"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          visibility: e.target.value as FormData["visibility"],
                        })
                      }
                      className="mt-0.5 w-5 h-5 accent-text-primary"
                    />
                    <div className="flex-1">
                      <p className="text-base font-semibold text-text-primary mb-1">
                        Private
                      </p>
                      <p className="text-small text-text-secondary">
                        Only visible to people with the direct link
                      </p>
                    </div>
                  </label>

                  {/* Invite-Only Option */}
                  <label className="flex items-start gap-3 p-4 rounded-lg border-2 border-border-light cursor-pointer transition-all hover:border-text-primary has-[:checked]:border-text-primary has-[:checked]:bg-bg-page">
                    <input
                      type="radio"
                      name="visibility"
                      value="invite-only"
                      checked={formData.visibility === "invite-only"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          visibility: e.target.value as FormData["visibility"],
                        })
                      }
                      className="mt-0.5 w-5 h-5 accent-text-primary"
                    />
                    <div className="flex-1">
                      <p className="text-base font-semibold text-text-primary mb-1">
                        Invite Only
                      </p>
                      <p className="text-small text-text-secondary">
                        Only invited guests can register
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border-light py-4 px-6 z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="btn-secondary"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              disabled={isSubmitting}
              className="btn-secondary"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? "Creating..." : "Create Event"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
