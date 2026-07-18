import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import { motherDay1Sms } from "@/lib/campaign/copy";

function makeInviteCode(phone: string) {
  return `OWJ-${phone.slice(-4)}${Date.now().toString(36).slice(-4).toUpperCase()}`;
}

export async function registerMotherLead(phone: string) {
  if (!/^09\d{9}$/.test(phone)) {
    return { success: false as const, message: "شماره موبایل معتبر نیست." };
  }

  const inviteCode = makeInviteCode(phone);

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from("mother_leads")
      .upsert({ phone, child_invite_code: inviteCode }, { onConflict: "phone" })
      .select()
      .single();

    if (error) {
      // if unique invite conflict, fetch existing
      const existing = await supabase.from("mother_leads").select("*").eq("phone", phone).maybeSingle();
      if (existing.data) {
        await logSms(phone, "mother_day1", motherDay1Sms());
        return {
          success: true as const,
          leadId: existing.data.id as string,
          inviteCode: existing.data.child_invite_code as string,
          message: "ثبت شد.",
        };
      }
      return { success: false as const, message: error.message || "خطا در ثبت." };
    }

    await logSms(phone, "mother_day1", motherDay1Sms());
    return {
      success: true as const,
      leadId: data.id as string,
      inviteCode: data.child_invite_code as string,
      message: "ثبت شد.",
    };
  }

  await logSms(phone, "mother_day1", motherDay1Sms());
  return {
    success: true as const,
    leadId: `local_${phone}`,
    inviteCode,
    message: "ثبت شد (محلی).",
  };
}

export async function getMotherLeadByInvite(code: string) {
  if (!isSupabaseConfigured) return null;
  const { data } = await supabase
    .from("mother_leads")
    .select("*")
    .eq("child_invite_code", code)
    .maybeSingle();
  return data;
}

export async function upsertStudentCampaign(payload: {
  student_id?: string | null;
  mother_lead_id?: string | null;
  step: string;
  day?: number;
  field?: string | null;
  golden_chances?: number;
  chance_chest?: number;
  riddle_answered?: boolean;
  profile_completed?: boolean;
  lottery_entered?: boolean;
}) {
  if (!isSupabaseConfigured || !payload.student_id) return null;

  const { data, error } = await supabase
    .from("student_campaigns")
    .upsert(
      {
        ...payload,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "student_id" }
    )
    .select()
    .single();

  if (error) {
    console.error("campaign upsert", error);
    return null;
  }
  return data;
}

export async function logSms(phone: string, templateKey: string, body: string) {
  if (!isSupabaseConfigured) return;
  await supabase.from("campaign_sms_log").insert({
    phone,
    template_key: templateKey,
    body,
    status: "simulated",
  });
}

export async function createStudentFromInvite(input: {
  inviteCode: string;
  fullName: string;
  phone: string;
  city: string;
  field: string;
  province?: string;
}) {
  if (!isSupabaseConfigured) {
    return { success: true as const, studentId: `local_${input.phone}`, referralCode: input.inviteCode };
  }

  const lead = await getMotherLeadByInvite(input.inviteCode);

  const { data: user, error: userErr } = await supabase
    .from("users")
    .upsert({ phone: input.phone, role: "student" }, { onConflict: "phone" })
    .select()
    .single();

  if (userErr) {
    return { success: false as const, message: userErr.message };
  }

  const referralCode = input.inviteCode.startsWith("OWJ-")
    ? input.inviteCode
    : makeInviteCode(input.phone);

  const { data: student, error: stuErr } = await supabase
    .from("students")
    .upsert(
      {
        user_id: user.id,
        full_name: input.fullName,
        province: input.province || "نامشخص",
        city: input.city,
        grade: "دوازدهم",
        field: input.field,
        target_major: "نامشخص",
        referral_code: referralCode,
        total_chances: 2,
      },
      { onConflict: "user_id" }
    )
    .select()
    .single();

  // if upsert on user_id not supported, try insert
  if (stuErr) {
    const { data: inserted, error: insertErr } = await supabase
      .from("students")
      .insert({
        user_id: user.id,
        full_name: input.fullName,
        province: input.province || "نامشخص",
        city: input.city,
        grade: "دوازدهم",
        field: input.field,
        target_major: "نامشخص",
        referral_code: referralCode,
        total_chances: 2,
      })
      .select()
      .single();

    if (insertErr) {
      // maybe already exists
      const existing = await supabase.from("students").select("*").eq("user_id", user.id).maybeSingle();
      if (!existing.data) {
        return { success: false as const, message: insertErr.message };
      }
      if (lead) {
        await supabase.from("mother_leads").update({ student_id: existing.data.id }).eq("id", lead.id);
      }
      return { success: true as const, studentId: existing.data.id as string, referralCode };
    }

    if (lead) {
      await supabase.from("mother_leads").update({ student_id: inserted.id }).eq("id", lead.id);
    }
    await upsertStudentCampaign({
      student_id: inserted.id,
      mother_lead_id: lead?.id ?? null,
      step: "reward",
      day: 1,
      field: input.field,
      golden_chances: 2,
      chance_chest: 2,
      profile_completed: true,
      lottery_entered: true,
      riddle_answered: true,
    });
    return { success: true as const, studentId: inserted.id as string, referralCode };
  }

  if (lead) {
    await supabase.from("mother_leads").update({ student_id: student.id }).eq("id", lead.id);
  }

  await upsertStudentCampaign({
    student_id: student.id,
    mother_lead_id: lead?.id ?? null,
    step: "reward",
    day: 1,
    field: input.field,
    golden_chances: 2,
    chance_chest: 2,
    profile_completed: true,
    lottery_entered: true,
    riddle_answered: true,
  });

  return { success: true as const, studentId: student.id as string, referralCode };
}
