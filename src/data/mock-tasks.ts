import { TaskItem } from "@/types/tasks";

// Mock task data for UI development
export const mockClientTasks: TaskItem[] = [
  {
    id: "c1",
    title: "Complete Initial Assessment",
    role: "client",
    flow: "assessment",
    due: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    priority: "high",
    status: "todo",
    cta: {
      label: "Continue Assessment",
      href: "/assessment"
    },
    meta: {
      badges: ["Step 3/9"],
      slaMinutes: 120
    }
  },
  {
    id: "c2", 
    title: "Book Chemistry Call with Dr. Sarah Chen",
    role: "client",
    flow: "booking",
    due: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
    priority: "medium",
    status: "todo",
    cta: {
      label: "Book Now",
      href: "/book/therapist-123"
    },
    meta: {
      badges: ["Matched"],
      slaMinutes: 10080 // 1 week
    }
  },
  {
    id: "c3",
    title: "Leave Feedback for Last Session",
    role: "client", 
    flow: "session",
    due: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday (overdue)
    priority: "medium",
    status: "todo",
    cta: {
      label: "Leave Feedback",
      href: "/client/feedback/session-456"
    },
    meta: {
      badges: ["Session #3"],
      slaMinutes: 2880 // 2 days
    }
  },
  {
    id: "c4",
    title: "Enable SMS Notifications",
    role: "client",
    flow: "assessment", 
    due: null,
    priority: "low",
    status: "todo",
    cta: {
      label: "Update Settings",
      href: "/client/settings"
    },
    meta: {
      badges: ["Account Setup"]
    }
  },
  {
    id: "c5",
    title: "Session Feedback Submitted",
    role: "client",
    flow: "session",
    due: null,
    priority: "low",
    status: "done",
    cta: {
      label: "View Feedback",
      href: "/client/feedback/session-123"
    },
    meta: {
      badges: ["Session #2"]
    }
  }
];

export const mockTherapistTasks: TaskItem[] = [
  {
    id: "t1",
    title: "Submit Professional License Documentation",
    role: "therapist",
    flow: "verification",
    due: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    priority: "urgent",
    status: "todo",
    cta: {
      label: "Upload Documents",
      href: "/therapist/onboarding"
    },
    meta: {
      badges: ["Verification Required"],
      slaMinutes: 4320 // 3 days
    }
  },
  {
    id: "t2",
    title: "Record Introduction Video",
    role: "therapist",
    flow: "verification",
    due: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
    priority: "high",
    status: "todo",
    cta: {
      label: "Record Video",
      href: "/therapist/onboarding/video"
    },
    meta: {
      badges: ["Profile Setup"],
      slaMinutes: 7200 // 5 days
    }
  },
  {
    id: "t3",
    title: "Complete Session Notes for Emma Johnson",
    role: "therapist",
    flow: "session",
    due: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
    priority: "high",
    status: "in_progress",
    cta: {
      label: "Complete Notes",
      href: "/therapist/session/session-789"
    },
    meta: {
      badges: ["Session #5"],
      slaMinutes: 240 // 4 hours
    }
  },
  {
    id: "t4",
    title: "Add Availability for Next Week",
    role: "therapist",
    flow: "booking",
    due: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
    priority: "medium",
    status: "todo",
    cta: {
      label: "Update Calendar",
      href: "/therapist/calendar"
    },
    meta: {
      badges: ["Week of Dec 16"],
      slaMinutes: 2880 // 2 days
    }
  },
  {
    id: "t5",
    title: "Review Chemistry Call Request",
    role: "therapist",
    flow: "booking",
    due: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours
    priority: "medium",
    status: "todo",
    cta: {
      label: "Review & Accept",
      href: "/therapist/bookings"
    },
    meta: {
      badges: ["New Client"],
      slaMinutes: 720 // 12 hours
    }
  },
  {
    id: "t6",
    title: "Configure Payout Method",
    role: "therapist",
    flow: "payouts",
    due: null,
    priority: "low",
    status: "todo",
    cta: {
      label: "Setup Payouts",
      href: "/therapist/payouts"
    },
    meta: {
      badges: ["Account Setup"]
    }
  }
];

export const mockAdminTasks: TaskItem[] = [
  {
    id: "a1",
    title: "Review 8 Therapists Awaiting Verification",
    role: "admin",
    flow: "verification",
    due: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours
    priority: "urgent",
    status: "todo",
    cta: {
      label: "Review Queue",
      href: "/admin/therapists/verification"
    },
    meta: {
      badges: ["8 Pending"],
      slaMinutes: 480 // 8 hours
    }
  },
  {
    id: "a2",
    title: "Investigate Flagged Message (PII Exposure)",
    role: "admin",
    flow: "moderation",
    due: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    priority: "urgent",
    status: "todo",
    cta: {
      label: "Investigate",
      href: "/admin/moderation"
    },
    meta: {
      badges: ["PII", "Auto-flagged"],
      slaMinutes: 60 // 1 hour
    }
  },
  {
    id: "a3",
    title: "Resolve Payout Discrepancy",
    role: "admin",
    flow: "support",
    due: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    priority: "high",
    status: "in_progress",
    cta: {
      label: "Review Case",
      href: "/admin/financials"
    },
    meta: {
      badges: ["$247.50", "Therapist ID: 456"],
      slaMinutes: 1440 // 24 hours
    }
  },
  {
    id: "a4",
    title: "Retry Failed Webhook (Stripe Payment)",
    role: "admin",
    flow: "support",
    due: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
    priority: "medium",
    status: "todo",
    cta: {
      label: "Retry Webhook",
      href: "/admin/webhooks"
    },
    meta: {
      badges: ["Stripe", "Payment ID: pay_123"],
      slaMinutes: 480 // 8 hours
    }
  },
  {
    id: "a5",
    title: "Review Crisis Alert",
    role: "admin",
    flow: "moderation",
    due: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago (overdue)
    priority: "urgent",
    status: "todo",
    cta: {
      label: "Handle Crisis",
      href: "/admin/moderation"
    },
    meta: {
      badges: ["Crisis", "Client ID: 789"],
      slaMinutes: 15 // 15 minutes
    }
  },
  {
    id: "a6",
    title: "Monthly Platform Analytics Review",
    role: "admin",
    flow: "support",
    due: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
    priority: "low",
    status: "todo",
    cta: {
      label: "View Analytics",
      href: "/admin/analytics"
    },
    meta: {
      badges: ["December 2024"],
      slaMinutes: 10080 // 1 week
    }
  }
];