import { getParentReport, registerParentChild } from "@/lib/local-db";

export function registerChild(data: {
  childPhone: string;
  grade: string;
  field: string;
  province: string;
  city: string;
}) {
  return registerParentChild(data);
}

export function getChildReport(studentId: string) {
  return getParentReport(studentId);
}
