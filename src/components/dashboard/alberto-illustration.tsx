"use client";

export function AlbertoIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden>
      {/* Hair */}
      <div className="absolute left-1/2 top-[2%] h-[42%] w-[78%] -translate-x-1/2 rounded-t-[100%] bg-gradient-to-b from-slate-200 to-slate-300 shadow-inner" />
      <div className="absolute left-[18%] top-[8%] h-[28%] w-[22%] rotate-[-25deg] rounded-full bg-slate-200" />
      <div className="absolute right-[18%] top-[8%] h-[28%] w-[22%] rotate-[25deg] rounded-full bg-slate-200" />

      {/* Face */}
      <div className="absolute left-1/2 top-[24%] h-[38%] w-[52%] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#FDDCB5] to-[#E8B88A]" />

      {/* Eyes */}
      <div className="absolute left-[36%] top-[40%] h-2 w-2 rounded-full bg-slate-700" />
      <div className="absolute right-[36%] top-[40%] h-2 w-2 rounded-full bg-slate-700" />

      {/* Mustache */}
      <div className="absolute left-1/2 top-[52%] h-3 w-[28%] -translate-x-1/2 rounded-full bg-slate-400" />

      {/* Purple suit */}
      <div className="absolute bottom-0 left-1/2 h-[42%] w-[72%] -translate-x-1/2 rounded-t-[2rem] bg-gradient-to-b from-primary to-[#5a3de6]" />
      <div className="absolute bottom-[18%] left-1/2 h-[22%] w-[50%] -translate-x-1/2 rounded-t-2xl bg-primary/90" />

      {/* Shirt */}
      <div className="absolute bottom-[22%] left-1/2 h-[18%] w-[38%] -translate-x-1/2 rounded-t-xl bg-white" />

      {/* Bow tie */}
      <div className="absolute bottom-[34%] left-1/2 h-4 w-6 -translate-x-1/2">
        <div className="absolute left-0 h-4 w-3 rounded-l-full bg-primary-deep" />
        <div className="absolute right-0 h-4 w-3 rounded-r-full bg-primary-deep" />
      </div>

      {/* Pointing hand hint */}
      <div className="absolute -left-2 bottom-[30%] h-8 w-8 rotate-[-20deg] rounded-full bg-[#FDDCB5] ring-2 ring-white/50" />
    </div>
  );
}
