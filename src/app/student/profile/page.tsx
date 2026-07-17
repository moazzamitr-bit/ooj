"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import { ProfileCard } from "@/components/dashboard/profile-card";
import {
  SubjectCard,
  type SubjectTestSection,
} from "@/components/dashboard/subject-card";
import { SubjectYearStudyPanel } from "@/components/dashboard/subject-year-study-panel";
import { StudyCharts } from "@/components/charts/study-charts";
import { AdmissionAlbertoSection } from "@/components/dashboard/admission-alberto-section";
import { ReferralRewardBanner } from "@/components/referral/referral-reward-banner";
import { profileSubjectOrder } from "@/lib/data/profile-mock-data";
import { useApp } from "@/providers/app-provider";

export default function StudentProfilePage() {
  const { subjects } = useApp();
  const [selection, setSelection] = useState<{
    subjectId: string;
    section: SubjectTestSection;
  } | null>(null);

  const orderedSubjects = profileSubjectOrder
    .map((id) => subjects.find((s) => s.id === id))
    .filter(Boolean) as typeof subjects;

  const activeSubject = selection
    ? subjects.find((s) => s.id === selection.subjectId)
    : null;

  const handleSectionClick = (subjectId: string, section: SubjectTestSection) => {
    setSelection((prev) =>
      prev?.subjectId === subjectId && prev.section === section
        ? null
        : { subjectId, section }
    );
  };

  return (
    <div className="min-h-dvh bg-white">
      <AppHeader authLabel="دعوت دوستان" authHref="/student/referral" />

      <main className="mx-auto max-w-[1600px] space-y-8 px-6 py-8 md:px-8">
        <section className="space-y-6">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-stretch">
            <ProfileCard />
            <div className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
              {orderedSubjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  isActive={selection?.subjectId === subject.id}
                  activeSection={
                    selection?.subjectId === subject.id ? selection.section : null
                  }
                  onSectionClick={(section) => handleSectionClick(subject.id, section)}
                />
              ))}
            </div>
          </div>

          {activeSubject && selection && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <SubjectYearStudyPanel
                subjectId={activeSubject.id}
                subjectName={activeSubject.name}
                section={selection.section}
              />
            </div>
          )}
        </section>

        <section>
          <StudyCharts />
        </section>

        <section>
          <AdmissionAlbertoSection />
        </section>

        <section>
          <ReferralRewardBanner />
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
