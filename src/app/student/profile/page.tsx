"use client";

import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { SubjectCard } from "@/components/dashboard/subject-card";
import { StudyStructureAccordion } from "@/components/dashboard/study-structure-accordion";
import { StudyCharts } from "@/components/charts/study-charts";
import { AdmissionAlbertoSection } from "@/components/dashboard/admission-alberto-section";
import { ReferralRewardBanner } from "@/components/referral/referral-reward-banner";
import { profileSubjectOrder } from "@/lib/data/profile-mock-data";
import { useApp } from "@/providers/app-provider";
import { useStudentStore } from "@/store/student-store";

export default function StudentProfilePage() {
  const { subjects, subjectProgress } = useApp();
  const { activeSubjectId, setActiveSubject } = useStudentStore();

  const orderedSubjects = profileSubjectOrder
    .map((id) => subjects.find((s) => s.id === id))
    .filter(Boolean) as typeof subjects;

  const activeSubject = activeSubjectId
    ? subjects.find((s) => s.id === activeSubjectId)
    : null;

  return (
    <div className="min-h-dvh bg-white">
      <AppHeader authLabel="دعوت دوستان" authHref="/student/referral" />

      <main className="mx-auto max-w-[1600px] space-y-8 px-6 py-8 md:px-8">
        <section className="flex flex-col gap-6 xl:flex-row xl:items-start">
          <ProfileCard className="xl:pt-2" />
          <div className="grid flex-1 grid-cols-2 gap-4 lg:grid-cols-4">
            {orderedSubjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                progress={subjectProgress[subject.id] ?? 0}
                isActive={activeSubjectId === subject.id}
                onClick={() => setActiveSubject(subject.id)}
              />
            ))}
          </div>
        </section>

        {activeSubject && (
          <section>
            <StudyStructureAccordion subjectName={activeSubject.name} subjectId={activeSubject.id} />
          </section>
        )}

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
