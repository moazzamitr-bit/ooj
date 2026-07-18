"use client";

import Link from "next/link";
import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motherDay2 } from "@/lib/campaign/copy";

export default function ParentDay2Page() {
  return (
    <div className="min-h-screen bg-lavender/30">
      <AppHeader showAuth={false} />
      <div className="mx-auto max-w-lg px-6 py-14">
        <Card className="border-violet-100 shadow-md">
          <CardContent className="space-y-4 p-8 text-right">
            <h1 className="text-center text-2xl font-extrabold text-primary-deep">{motherDay2.title}</h1>
            {motherDay2.body.map((line) => (
              <p key={line} className="text-sm leading-8 text-slate-600">
                {line}
              </p>
            ))}
            <Link href="/parent/dashboard" className="mt-4 block">
              <Button variant="gradient" className="w-full">
                رفتن به داشبورد والد
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
