import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { studentId, answers } = await request.json();

    if (!studentId || !Array.isArray(answers)) {
      return NextResponse.json({ success: false, message: "داده نامعتبر." }, { status: 400 });
    }

    const supabase = createServerSupabase();
    if (supabase) {
      const questionIds = answers.map((a: { questionId: string }) => a.questionId);
      const { data: questions } = await supabase
        .from("questions")
        .select("id, correct_option")
        .in("id", questionIds);

      let correct = 0;
      const rows = answers.map(
        (a: { questionId: string; selected: string; timeSpent: number }) => {
          const q = questions?.find((q) => q.id === a.questionId);
          const isCorrect = q ? a.selected === q.correct_option : false;
          if (isCorrect) correct++;
          return {
            student_id: studentId,
            question_id: a.questionId,
            selected_option: a.selected,
            is_correct: isCorrect,
            time_spent_seconds: a.timeSpent,
          };
        }
      );

      await supabase.from("student_answers").insert(rows);

      const { data: student } = await supabase
        .from("students")
        .select("total_chances")
        .eq("id", studentId)
        .single();

      if (student) {
        await supabase
          .from("students")
          .update({ total_chances: (student.total_chances ?? 0) + 1 })
          .eq("id", studentId);
      }

      return NextResponse.json({ success: true, correct, total: answers.length });
    }

    return NextResponse.json({
      success: true,
      message: "از سمت کلاینت ذخیره شود.",
      clientSide: true,
    });
  } catch {
    return NextResponse.json({ success: false, message: "خطا در ثبت تست." }, { status: 500 });
  }
}
