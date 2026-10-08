import { STATUS_COLORS } from "@/lib/constants";

type StatusKey = keyof typeof STATUS_COLORS;

export function Badge({ status }: { status: StatusKey | string }) {
  const config =
    STATUS_COLORS[status as StatusKey] || {
      label: status,
      bg: "bg-slate-800",
      text: "text-slate-300",
      border: "border-slate-700",
    };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
    >
      {config.label}
    </span>
  );
}