"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface AddParticipantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (participant: {
    name: string;
    email: string;
    company?: string;
    role?: string;
  }) => void;
}

export function AddParticipantModal({
  isOpen,
  onClose,
  onAdd,
}: AddParticipantModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Call the onAdd callback with the form data
    onAdd({
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim() || undefined,
      role: formData.role.trim() || undefined,
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      role: "",
    });
    setErrors({
      name: "",
      email: "",
    });

    // Close modal
    onClose();
  };

  const handleClose = () => {
    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      role: "",
    });
    setErrors({
      name: "",
      email: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-border-light px-6 py-4 flex items-center justify-between">
          <h2 className="text-h3 font-semibold text-text-primary">
            Add Participant Manually
          </h2>
          <button
            onClick={handleClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-small font-semibold text-text-primary mb-2">
              Name <span className="text-red-500">*</span>
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
              <p className="text-small text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-small font-semibold text-text-primary mb-2">
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
              <p className="text-small text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Company Field */}
          <div>
            <label className="block text-small font-semibold text-text-primary mb-2">
              Company <span className="text-text-secondary">(Optional)</span>
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              className="input"
              placeholder="Company name"
            />
          </div>

          {/* Role Field */}
          <div>
            <label className="block text-small font-semibold text-text-primary mb-2">
              Role <span className="text-text-secondary">(Optional)</span>
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="input"
              placeholder="CEO, Developer, etc."
            />
          </div>

          {/* Info Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-small text-blue-800">
              💡 The participant will be added with "registered" status. They
              can be checked in later from the Check-in tab.
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="border-t border-border-light px-6 py-4 flex justify-end gap-3">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Participant
          </Button>
        </div>
      </div>
    </div>
  );
}
