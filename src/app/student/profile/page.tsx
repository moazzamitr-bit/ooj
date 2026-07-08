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
  const { subjects, subjectProgress } = useApp();
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
            <ProfileCard className="xl:pt-2" />
            <div className="grid flex-1 grid-cols-2 gap-4 lg:grid-cols-4">
              {orderedSubjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  progress={subjectProgress[subject.id] ?? 0}
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
            <SubjectYearStudyPanel
              subjectId={activeSubject.id}
              subjectName={activeSubject.name}
              section={selection.section}
            />
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
