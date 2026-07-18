"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { childInviteUrl } from "@/lib/campaign/routing";

interface CopyReferralLinkProps {
  referralCode: string;
}

export function CopyReferralLink({ referralCode }: CopyReferralLinkProps) {
  const [copied, setCopied] = useState(false);
  const link = childInviteUrl(referralCode);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-violet-100">
      <CardHeader>
        <CardTitle className="text-base">لینک دعوت اختصاصی</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 rounded-xl border border-violet-100 bg-lavender/50 p-3">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
            {copied ? "کپی شد!" : "کپی لینک"}
          </Button>
          <span className="flex-1 truncate text-left text-sm text-slate-500 dir-ltr">{link}</span>
        </div>
      </CardContent>
    </Card>
  );
}
