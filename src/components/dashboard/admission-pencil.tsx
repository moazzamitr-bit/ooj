"use client";

import { useCallback, useEffect, useRef } from "react";
import { ChevronsUpDown } from "lucide-react";
import { provinceMaxRankRows } from "@/lib/data/province-max-ranks";
import styles from "./admission-pencil.module.css";

interface AdmissionPencilProps {
  selectedCode: string;
  onSelect: (code: string) => void;
}

export function AdmissionPencil({ selectedCode, onSelect }: AdmissionPencilProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const selectedRowRef = useRef<HTMLTableRowElement>(null);
  const rowRefs = useRef<Map<string, HTMLTableRowElement>>(new Map());
  const selectedCodeRef = useRef(selectedCode);
  const ignoreSpyUntilRef = useRef(0);
  const selectionSourceRef = useRef<"click" | "scroll" | null>(null);
  const rafRef = useRef<number | null>(null);

  selectedCodeRef.current = selectedCode;

  const syncSelectionFromScroll = useCallback(() => {
    if (Date.now() < ignoreSpyUntilRef.current) return;

    const body = bodyRef.current;
    if (!body || rowRefs.current.size === 0) return;

    const bodyRect = body.getBoundingClientRect();
    const focusY = bodyRect.top + 14;

    let activeCode: string | null = null;
    let bestScore = Number.POSITIVE_INFINITY;

    for (const [code, el] of rowRefs.current) {
      const rect = el.getBoundingClientRect();
      if (rect.bottom <= bodyRect.top || rect.top >= bodyRect.bottom) continue;

      const containsFocus = focusY >= rect.top && focusY <= rect.bottom;
      const dist = containsFocus
        ? 0
        : Math.min(Math.abs(rect.top - focusY), Math.abs(rect.bottom - focusY));

      if (dist < bestScore) {
        bestScore = dist;
        activeCode = code;
        if (containsFocus) break;
      }
    }

    if (activeCode && activeCode !== selectedCodeRef.current) {
      selectionSourceRef.current = "scroll";
      onSelect(activeCode);
    }
  }, [onSelect]);

  const scheduleScrollSync = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      syncSelectionFromScroll();
    });
  }, [syncSelectionFromScroll]);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    body.addEventListener("scroll", scheduleScrollSync, { passive: true });
    scheduleScrollSync();

    return () => {
      body.removeEventListener("scroll", scheduleScrollSync);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [scheduleScrollSync]);

  useEffect(() => {
    if (selectionSourceRef.current === "scroll") {
      selectionSourceRef.current = null;
      return;
    }

    if (selectionSourceRef.current !== "click") return;

    selectedRowRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });

    const unlockAt = Date.now() + 450;
    ignoreSpyUntilRef.current = unlockAt;
    const timer = window.setTimeout(() => {
      if (ignoreSpyUntilRef.current === unlockAt) {
        selectionSourceRef.current = null;
      }
    }, 450);

    return () => window.clearTimeout(timer);
  }, [selectedCode]);

  const selectByClick = (code: string) => {
    selectionSourceRef.current = "click";
    ignoreSpyUntilRef.current = Date.now() + 450;
    onSelect(code);
  };

  return (
    <div className={styles.pencilWrap}>
      <div className={styles.pencil} role="group" aria-label="ستون حداقل رتبه قبولی شهرستان‌ها">
        <div className={`${styles.eraser} ${styles.curv}`}>
          <span className={styles.eraserTitle}>حداقل رتبه قبولی دانشگاه‌ها</span>
        </div>

        <div className={`${styles.ferrule} ${styles.ferruleHeader}`} role="row">
          <span className={styles.ferruleName}>شهرستان</span>
          <span className={styles.ferruleRank}>حداقل رتبه</span>
        </div>

        <div className={styles.body} ref={bodyRef}>
          <table className={styles.table}>
            <tbody>
              {provinceMaxRankRows.map((row) => {
                const isSelected = row.code === selectedCode;
                return (
                  <tr
                    key={row.code}
                    ref={(el) => {
                      if (el) rowRefs.current.set(row.code, el);
                      else rowRefs.current.delete(row.code);
                      if (isSelected) selectedRowRef.current = el;
                    }}
                    className={`${styles.row} ${isSelected ? styles.rowActive : ""}`}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    data-code={row.code}
                    onClick={() => selectByClick(row.code)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        selectByClick(row.code);
                      }
                    }}
                  >
                    <td className={styles.cName}>{row.name}</td>
                    <td className={styles.cRank}>{row.maxRank.toLocaleString("fa-IR")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className={`${styles.columnBase} ${styles.curv}`} aria-hidden />
      </div>

      <div className={styles.scrollHint} title="با اسکرول، جزئیات شهر عوض می‌شود" aria-hidden>
        <ChevronsUpDown className={styles.scrollIcon} />
      </div>
    </div>
  );
}
