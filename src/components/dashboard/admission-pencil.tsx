"use client";

import { useCallback, useEffect, useRef } from "react";
import { ChevronsUpDown } from "lucide-react";
import { provinceMaxRankRows } from "@/lib/data/province-max-ranks";
import styles from "./admission-pencil.module.css";

interface AdmissionPencilProps {
  selectedCode: string;
  onSelect: (code: string) => void;
}

function BookEmblemIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M12 6.5C10.3 5 7.5 4.7 4 5.2v11.2c3.5-.5 6.3-.2 8 1.3 1.7-1.5 4.5-1.8 8-1.3V5.2C16.5 4.7 13.7 5 12 6.5Z"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 6.5v11.5" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
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
    const thead = body.querySelector("thead");
    const headerH = thead?.getBoundingClientRect().height ?? 36;
    // City under the sticky header lines up with the detail panel on the side.
    const focusY = bodyRect.top + headerH + 14;

    let activeCode: string | null = null;
    let bestScore = Number.POSITIVE_INFINITY;

    for (const [code, el] of rowRefs.current) {
      const rect = el.getBoundingClientRect();
      if (rect.bottom <= bodyRect.top + headerH || rect.top >= bodyRect.bottom) continue;

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
          <span className={styles.eraserTitle}>حداقل رتبه قبولی</span>
        </div>

        <div className={styles.ferrule} aria-hidden>
          <div className={styles.emblem}>
            <BookEmblemIcon />
          </div>
        </div>

        <div className={styles.body} ref={bodyRef}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.hName}>شهرستان</th>
                <th className={styles.hRank}>حداقل رتبه</th>
              </tr>
            </thead>
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
