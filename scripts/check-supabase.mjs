#!/usr/bin/env node
/**
 * Test Supabase connection — run: npm run check:supabase
 * Requires .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) return;
  const content = readFileSync(path, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("\n🔍 بررسی اتصال Supabase به اوج\n");

if (!url || !anonKey) {
  console.error("❌ NEXT_PUBLIC_SUPABASE_URL یا NEXT_PUBLIC_SUPABASE_ANON_KEY در .env.local نیست.");
  console.error("   از داشبورد Supabase → Project Settings → API کپی کنید.\n");
  process.exit(1);
}

console.log("✓ URL:", url);
console.log("✓ Anon key:", anonKey.slice(0, 20) + "...");

if (!serviceKey) {
  console.warn("⚠ SUPABASE_SERVICE_ROLE_KEY نیست — APIهای سرور ممکن است محدود شوند.\n");
}

async function main() {
  const key = serviceKey || anonKey;
  const res = await fetch(`${url}/rest/v1/users?select=id&limit=1`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
  });

  if (res.status === 404 || res.status === 400) {
    const text = await res.text();
    if (text.includes("relation") || text.includes("does not exist")) {
      console.error("\n❌ جدول users وجود ندارد.");
      console.error("   در Supabase → SQL Editor فایل src/lib/supabase/schema.sql را اجرا کنید.\n");
      process.exit(1);
    }
  }

  if (!res.ok) {
    console.error("\n❌ اتصال برقرار نشد:", res.status, await res.text());
    process.exit(1);
  }

  console.log("\n✅ اتصال Supabase برقرار است!");
  console.log("   حالا npm run dev را اجرا کنید (نه GitHub Pages — API فقط روی سرور Node کار می‌کند).\n");
}

main().catch((err) => {
  console.error("\n❌ خطا:", err.message);
  process.exit(1);
});
