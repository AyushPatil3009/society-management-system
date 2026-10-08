// =============================================================================
// GLOBAL SOCIETY APP CONFIGURATION & DESIGN TOKENS
// Change here -> updates across the entire application!
// =============================================================================

export const SOCIETY_CONFIG = {
  name: "Gokuldham Co-operative Housing Society",
  shortName: "Gokuldham Portal",
  tagline: "Smart, Peaceful & United Community Living",
  code: "GCS",
  location: "Powai, Mumbai - 400076",
  demoAccounts: [
    { role: "Admin", name: "Atmaram Bhide", email: "bhide@gcs.com", pass: "password123" },
    { role: "Resident", name: "Jethalal Gada", email: "jethalal@gcs.com", pass: "password123" },
    { role: "Staff", name: "Popatlal Pandey", email: "popatlal@gcs.com", pass: "password123" },
  ],
};

// Centralized status badges and colors
export const STATUS_COLORS = {
  // Complaint Statuses
  OPEN: { label: "Open", bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  ASSIGNED: { label: "Assigned", bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  IN_PROGRESS: { label: "In Progress", bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20" },
  RESOLVED: { label: "Resolved", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  CLOSED: { label: "Closed", bg: "bg-slate-500/10", text: "text-slate-400", border: "border-slate-500/20" },
  REJECTED: { label: "Rejected", bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20" },

  // User Approval Statuses
  ACTIVE: { label: "Active", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  PENDING_APPROVAL: { label: "Pending Approval", bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  INACTIVE: { label: "Inactive", bg: "bg-slate-500/10", text: "text-slate-400", border: "border-slate-500/20" },

  // Maintenance Statuses
  PAID: { label: "Paid", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  PENDING: { label: "Pending", bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  OVERDUE: { label: "Overdue", bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20" },
} as const;

// Navigation items for each role
export const NAV_ITEMS = {
  ADMIN: [
    { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
    { label: "Complaints", href: "/admin/complaints", icon: "🛠️" },
    { label: "Residents", href: "/admin/residents", icon: "👥" },
    { label: "Society Structure", href: "/admin/structure", icon: "🏢" },
    { label: "Staff Directory", href: "/admin/staff", icon: "🔧" },
    { label: "Notices", href: "/admin/notices", icon: "📢" },
    { label: "Maintenance", href: "/admin/maintenance", icon: "💳" },
    { label: "Facilities", href: "/admin/facilities", icon: "🏸" },
  ],
  RESIDENT: [
    { label: "Dashboard", href: "/resident/dashboard", icon: "🏠" },
    { label: "My Complaints", href: "/resident/complaints", icon: "🛠️" },
    { label: "Maintenance Bills", href: "/resident/bills", icon: "💳" },
    { label: "Book Facility", href: "/resident/bookings", icon: "🏸" },
    { label: "Notice Board", href: "/resident/notices", icon: "📢" },
  ],
  STAFF: [
    { label: "Dashboard", href: "/staff/dashboard", icon: "🔧" },
    { label: "Assigned Tasks", href: "/staff/tasks", icon: "📋" },
  ],
} as const;