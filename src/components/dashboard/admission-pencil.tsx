"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    selectedRowRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [selectedCode]);

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
                    ref={isSelected ? selectedRowRef : undefined}
                    className={`${styles.row} ${isSelected ? styles.rowActive : ""}`}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    onClick={() => onSelect(row.code)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelect(row.code);
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

      <div className={styles.scrollHint} aria-hidden>
        <ChevronsUpDown className={styles.scrollIcon} />
      </div>
    </div>
  );
}
