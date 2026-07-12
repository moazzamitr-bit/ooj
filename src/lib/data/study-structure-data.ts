import type { SubjectTestSection } from "@/components/dashboard/subject-card";
import {
  getChaptersForSection,
  GRADE_LABELS,
  SUBJECT_FULL_NAMES,
  type StudyChapterNode,
  type StudyTopicNode,
} from "@/lib/data/curriculum-data";

export type TestDifficulty = "simple" | "medium" | "hard" | "konkur";

export const TEST_DIFFICULTIES: { id: TestDifficulty; label: string }[] = [
  { id: "simple", label: "ساده" },
  { id: "medium", label: "معمولی" },
  { id: "hard", label: "سخت" },
  { id: "konkur", label: "کنکور" },
];

export const TALFIYI_TEST_DIFFICULTIES = TEST_DIFFICULTIES.filter(
  (difficulty) => difficulty.id !== "konkur"
);

export type { StudyChapterNode, StudyTopicNode };

const SECTION_LABELS: Record<SubjectTestSection, string> = {
  year1: GRADE_LABELS.year1,
  year2: GRADE_LABELS.year2,
  year3: GRADE_LABELS.year3,
  konkur_talfiyi: "کنکور تالیفی",
  konkur_sarasari: "کنکور سراسری",
};

export function getSectionLabel(section: SubjectTestSection): string {
  return SECTION_LABELS[section];
}

export function getYearStudyStructure(
  subjectId: string,
  _subjectName: string,
  section: SubjectTestSection
): { title: string; chapters: StudyChapterNode[] } {
  const fullName = SUBJECT_FULL_NAMES[subjectId] ?? _subjectName;
  const gradeLabel = SECTION_LABELS[section];

  return {
    title: `${fullName} ${gradeLabel}`,
    chapters: getChaptersForSection(subjectId, section),
  };
}
