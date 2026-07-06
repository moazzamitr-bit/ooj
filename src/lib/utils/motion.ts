export const motionTokens = {
  fast: 0.15,
  normal: 0.25,
  slow: 0.35,
  spring: { type: "spring" as const, stiffness: 260, damping: 24 },
  easeOut: [0.16, 1, 0.3, 1] as const,
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.normal, ease: motionTokens.easeOut },
  },
};

export function getReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
