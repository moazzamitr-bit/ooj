"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import banknote50k from "@/assets/images/banknote-50k.png";
import banknote100k from "@/assets/images/banknote-100k.png";

const NOTE_COUNT = 14;

interface FallingNote {
  id: number;
  left: number;
  delay: number;
  duration: number;
  startRotate: number;
  endRotate: number;
  scale: number;
  drift: number;
  variant: "50k" | "100k";
}

function buildNotes(): FallingNote[] {
  return Array.from({ length: NOTE_COUNT }, (_, id) => ({
    id,
    left: 4 + ((id * 17.3) % 88),
    delay: (id * 0.55) % 6.5,
    duration: 7 + (id % 5) * 0.9,
    startRotate: -40 + (id * 29) % 80,
    endRotate: 120 + (id * 41) % 200,
    scale: 0.42 + (id % 4) * 0.12,
    drift: id % 2 === 0 ? 28 : -24,
    variant: id % 2 === 0 ? "50k" : "100k",
  }));
}

export function FallingBanknotes() {
  const reduceMotion = useReducedMotion();
  const notes = useMemo(() => buildNotes(), []);

  if (reduceMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {notes.slice(0, 4).map((note) => (
          <Image
            key={note.id}
            src={note.variant === "50k" ? banknote50k : banknote100k}
            alt=""
            width={120}
            height={68}
            className="absolute opacity-25"
            style={{
              left: `${note.left}%`,
              top: `${12 + note.id * 18}%`,
              transform: `rotate(${note.startRotate}deg) scale(${note.scale})`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {notes.map((note) => {
        const src = note.variant === "50k" ? banknote50k : banknote100k;
        const width = note.variant === "50k" ? 369 : 464;
        const height = note.variant === "50k" ? 314 : 261;

        return (
          <motion.div
            key={note.id}
            className="absolute top-0 will-change-transform"
            style={{
              left: `${note.left}%`,
              width: `${7.5 * note.scale}rem`,
            }}
            initial={{
              y: "-12%",
              x: 0,
              rotate: note.startRotate,
              opacity: 0,
            }}
            animate={{
              y: ["-12%", "108%"],
              x: [0, note.drift, -note.drift * 0.6, note.drift * 0.4, 0],
              rotate: [note.startRotate, note.endRotate],
              opacity: [0, 0.92, 0.92, 0.75, 0],
            }}
            transition={{
              duration: note.duration,
              delay: note.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.08, 0.72, 0.9, 1],
            }}
          >
            <Image
              src={src}
              alt=""
              width={width}
              height={height}
              className="h-auto w-full drop-shadow-[0_8px_16px_rgba(17,26,76,0.18)]"
              sizes="120px"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
