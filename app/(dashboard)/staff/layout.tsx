import DashboardLayout from "@/components/shared/DashboardLayout";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="STAFF">{children}</DashboardLayout>;
}