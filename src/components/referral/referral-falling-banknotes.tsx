"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import banknote50k from "@/assets/images/banknote-50k.png";
import banknote100k from "@/assets/images/banknote-100k.png";

type BanknoteAsset = typeof banknote50k;

interface NoteConfig {
  src: BanknoteAsset;
  left: string;
  width: number;
  delay: number;
  duration: number;
  rotate: number;
  sway: number;
  opacity: number;
  blur?: number;
}

const FALLING_NOTES: NoteConfig[] = [
  { src: banknote100k, left: "6%", width: 132, delay: 0, duration: 9.5, rotate: -28, sway: 18, opacity: 0.92 },
  { src: banknote50k, left: "18%", width: 118, delay: 2.4, duration: 11, rotate: 14, sway: -14, opacity: 0.88, blur: 0.5 },
  { src: banknote100k, left: "34%", width: 108, delay: 4.8, duration: 10.2, rotate: -8, sway: 10, opacity: 0.75, blur: 1 },
  { src: banknote50k, left: "52%", width: 126, delay: 1.2, duration: 12, rotate: 22, sway: -16, opacity: 0.9 },
  { src: banknote100k, left: "68%", width: 140, delay: 3.6, duration: 9.8, rotate: -18, sway: 12, opacity: 0.95 },
  { src: banknote50k, left: "82%", width: 112, delay: 5.5, duration: 10.8, rotate: 10, sway: -10, opacity: 0.82, blur: 0.5 },
  { src: banknote100k, left: "92%", width: 96, delay: 7, duration: 11.5, rotate: -32, sway: 8, opacity: 0.7, blur: 1.5 },
  { src: banknote50k, left: "42%", width: 104, delay: 6.2, duration: 13, rotate: 6, sway: -8, opacity: 0.65, blur: 2 },
];

const STATIC_NOTES: NoteConfig[] = [
  { src: banknote100k, left: "8%", width: 128, delay: 0, duration: 0, rotate: -24, sway: 0, opacity: 0.85 },
  { src: banknote50k, left: "22%", width: 112, delay: 0, duration: 0, rotate: 12, sway: 0, opacity: 0.8 },
  { src: banknote100k, left: "72%", width: 136, delay: 0, duration: 0, rotate: -14, sway: 0, opacity: 0.9 },
  { src: banknote50k, left: "86%", width: 108, delay: 0, duration: 0, rotate: 20, sway: 0, opacity: 0.78 },
];

function BanknoteImage({ note, className }: { note: NoteConfig; className?: string }) {
  return (
    <Image
      src={note.src}
      alt=""
      aria-hidden
      width={note.width}
      height={Math.round(note.width * 0.48)}
      className={className}
      style={{
        width: note.width,
        height: "auto",
        opacity: note.opacity,
        filter: note.blur ? `blur(${note.blur}px)` : undefined,
      }}
      draggable={false}
    />
  );
}

function AnimatedNote({ note }: { note: NoteConfig }) {
  return (
    <motion.div
      className="pointer-events-none absolute top-0 will-change-transform"
      style={{ left: note.left, marginLeft: -note.width / 2 }}
      initial={{ y: "-30%", rotate: note.rotate, opacity: 0 }}
      animate={{
        y: ["-30%", "115%"],
        rotate: [note.rotate, note.rotate + note.sway, note.rotate - note.sway * 0.5, note.rotate],
        opacity: [0, note.opacity, note.opacity, 0],
      }}
      transition={{
        duration: note.duration,
        delay: note.delay,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.08, 0.88, 1],
      }}
    >
      <BanknoteImage note={note} className="drop-shadow-[0_8px_20px_rgba(63,54,120,0.22)]" />
    </motion.div>
  );
}

function StaticNote({ note, index }: { note: NoteConfig; index: number }) {
  const topOffsets = ["12%", "38%", "22%", "55%"];
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: note.left,
        top: topOffsets[index % topOffsets.length],
        transform: `rotate(${note.rotate}deg)`,
        marginLeft: -note.width / 2,
      }}
    >
      <BanknoteImage note={note} className="drop-shadow-[0_8px_20px_rgba(63,54,120,0.18)]" />
    </div>
  );
}

export function ReferralFallingBanknotes() {
  const reduceMotion = useReducedMotion();
  const notes = reduceMotion ? STATIC_NOTES : FALLING_NOTES;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {notes.map((note, index) =>
        reduceMotion ? (
          <StaticNote key={`static-${index}`} note={note} index={index} />
        ) : (
          <AnimatedNote key={`falling-${index}`} note={note} />
        )
      )}
    </div>
  );
}
