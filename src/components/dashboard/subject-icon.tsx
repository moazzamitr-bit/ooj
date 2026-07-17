import {
  FlaskConical,
  Atom,
  Dna,
  Mountain,
  Sigma,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const subjectIconMap: Record<string, LucideIcon> = {
  sub_chem: FlaskConical,
  sub_physics: Atom,
  sub_bio: Dna,
  sub_geo: Mountain,
  sub_math: Sigma,
};

interface SubjectIconProps {
  subjectId: string;
  className?: string;
  iconClassName?: string;
}

export function SubjectIcon({ subjectId, className, iconClassName }: SubjectIconProps) {
  const Icon = subjectIconMap[subjectId] ?? FlaskConical;
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Icon className={cn("h-6 w-6", iconClassName)} strokeWidth={2} aria-hidden />
    </div>
  );
}
