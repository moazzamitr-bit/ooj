"use client";

import { cn } from "@/lib/utils/cn";

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div className={cn("inline-flex rounded-xl bg-lavender p-1", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-all",
            value === option.value
              ? "bg-white text-primary shadow-sm"
              : "text-slate-500 hover:text-primary-deep"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
