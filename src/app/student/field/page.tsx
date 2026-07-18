"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fieldSelectTitle } from "@/lib/campaign/copy";
import { useCampaignStore } from "@/store/campaign-store";
import type { StudentField } from "@/types";

const fields: { value: StudentField; label: string; icon: string }[] = [
  { value: "تجربی", label: "تجربی", icon: "🧪" },
  { value: "انسانی", label: "انسانی", icon: "📚" },
  { value: "ریاضی", label: "ریاضی", icon: "📐" },
];

export default function FieldSelectPage() {
  const router = useRouter();
  const setField = useCampaignStore((s) => s.setField);

  function pick(field: StudentField) {
    setField(field);
    router.push("/student/quiz");
  }

  return (
    <div className="min-h-screen gradient-hero">
      <div className="mx-auto max-w-md px-6 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl font-extrabold text-primary-deep md:text-2xl">{fieldSelectTitle}</h1>
          <div className="mt-8 space-y-3">
            {fields.map((f) => (
              <Button
                key={f.value}
                type="button"
                variant="outline"
                size="lg"
                className="h-14 w-full justify-center gap-2 text-lg"
                onClick={() => pick(f.value)}
              >
                <span>{f.icon}</span>
                {f.label}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
