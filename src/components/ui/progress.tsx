import { cn } from "@/lib/utils/cn";
import { toPersianDigits } from "@/lib/utils/persian";

interface ProgressProps {
  value: number;
  className?: string;
  barClassName?: string;
  trackClassName?: string;
  showLabel?: boolean;
  height?: "sm" | "md";
}

export function Progress({
  value,
  className,
  barClassName,
  trackClassName,
  showLabel = false,
  height = "md",
}: ProgressProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div
        className={cn(
          "w-full overflow-hidden rounded-full bg-slate-100",
          height === "sm" ? "h-1.5" : "h-2.5",
          trackClassName
        )}
      >
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-l from-primary to-electric-blue transition-all duration-700 ease-out",
            barClassName
          )}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-slate-500">{toPersianDigits(value)}٪</span>
      )}
    </div>
  );
}
