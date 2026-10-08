import DashboardLayout from "@/components/shared/DashboardLayout";

export default function ResidentLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="RESIDENT">{children}</DashboardLayout>;
}