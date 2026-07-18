"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCampaignStore } from "@/store/campaign-store";

export default function Day5RedirectPage() {
  const router = useRouter();
  const isMember = useCampaignStore((s) => s.campaign.is_golden_member);

  useEffect(() => {
    router.replace(isMember ? "/student/games/marathon/" : "/student/membership/");
  }, [router, isMember]);

  return (
    <div className="flex min-h-screen items-center justify-center text-slate-500">
      در حال ورود به روز پنجم...
    </div>
  );
}
