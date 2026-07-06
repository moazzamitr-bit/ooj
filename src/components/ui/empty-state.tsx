import { cn } from "@/lib/utils/cn";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon = "📭", title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-2xl border border-dashed border-violet-200 bg-lavender/30 px-6 py-12 text-center", className)}>
      <span className="mb-4 text-4xl">{icon}</span>
      <h3 className="text-lg font-bold text-primary-deep">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-slate-500">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
