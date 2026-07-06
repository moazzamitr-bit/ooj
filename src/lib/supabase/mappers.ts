import type { Student, User, UserRole } from "@/types";

export function mapSupabaseUser(row: Record<string, unknown>): User {
  return {
    id: String(row.id),
    phone: String(row.phone),
    role: row.role as UserRole,
    created_at: String(row.created_at ?? new Date().toISOString()),
  };
}

export function mapSupabaseStudent(row: Record<string, unknown>): Student {
  return {
    id: String(row.id),
    user_id: String(row.user_id),
    parent_id: row.parent_id ? String(row.parent_id) : null,
    full_name: String(row.full_name ?? "دانش‌آموز"),
    province: String(row.province ?? "تهران"),
    city: String(row.city ?? "تهران"),
    grade: String(row.grade ?? "دوازدهم"),
    field: row.field as Student["field"],
    target_major: String(row.target_major ?? "نامشخص"),
    avatar_url: row.avatar_url ? String(row.avatar_url) : null,
    total_chances: Number(row.total_chances ?? 0),
    referral_code: String(row.referral_code),
    created_at: String(row.created_at ?? new Date().toISOString()),
  };
}
