import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "purple";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        {
          "bg-slate-100 text-slate-600": variant === "default",
          "bg-emerald-50 text-success": variant === "success",
          "bg-orange-50 text-warning": variant === "warning",
          "bg-violet-50 text-primary": variant === "purple",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
