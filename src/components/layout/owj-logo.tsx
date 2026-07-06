export function OwjLogo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="12" fill="url(#owj-gradient)" />
      <path
        d="M10 26C10 26 14 14 20 14C26 14 30 26 30 26"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M12 22C12 22 16 18 20 18C24 18 28 22 28 22"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="20" cy="28" r="2" fill="white" />
      <defs>
        <linearGradient id="owj-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#6D4DFF" />
          <stop offset="1" stopColor="#2F80FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
