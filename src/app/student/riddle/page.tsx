"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { riddle } from "@/lib/campaign/copy";
import { useCampaignStore } from "@/store/campaign-store";

export default function StudentRiddlePage() {
  const router = useRouter();
  const markRiddleDone = useCampaignStore((s) => s.markRiddleDone);

  function answer() {
    markRiddleDone();
    router.push("/student/riddle/success");
  }

  return (
    <div className="min-h-screen gradient-hero">
      <div className="mx-auto max-w-lg px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-violet-100 shadow-md">
            <CardContent className="p-6 md:p-8">
              <p className="text-center text-lg font-bold leading-8 text-primary-deep">{riddle.prompt}</p>
              <div className="mt-6 space-y-3">
                {riddle.options.map((opt) => (
                  <Button
                    key={opt.key}
                    type="button"
                    variant="outline"
                    className="h-auto w-full justify-start py-3 text-right"
                    onClick={answer}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
