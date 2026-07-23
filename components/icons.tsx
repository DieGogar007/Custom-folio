type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function FishIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M2.5 12c3.8-4.8 9-4.8 12.5 0-3.5 4.8-8.7 4.8-12.5 0Z" />
      <path d="M15 12l5.5-4v8L15 12Z" />
      <circle cx="6.8" cy="11" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SnorkelIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <rect x="2.5" y="8.5" width="13" height="7" rx="3.5" />
      <path d="M9 15.5v2.5" />
      <path d="M20.5 4v9a3.5 3.5 0 0 1-3.5 3.5" />
      <circle cx="6.5" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="11.5" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BirdIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M3.5 16.5c6.5 2.6 12.8-.6 14-7l3-1.8-3.6-1.1C14.6 2.7 9.3 5 9 10l-6 4.5 0.5 2Z" />
      <circle cx="14.6" cy="7.6" r="0.9" fill="currentColor" stroke="none" />
      <path d="M9.5 19.5h5" />
    </svg>
  );
}

export function SparkIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M12 3.5 13.7 9 19 10.8l-5.3 1.7L12 18l-1.7-5.5L5 10.8 10.3 9 12 3.5Z" />
      <circle cx="18.5" cy="4.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="5" cy="18.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CheckIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2.4} aria-hidden>
      <path d="M4.5 12.5 10 18 19.5 6.5" />
    </svg>
  );
}

export function PlayIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

export function PinIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M12 21.5S5 15.6 5 10a7 7 0 1 1 14 0c0 5.6-7 11.5-7 11.5Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function PhoneIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M5 4h4l1.5 4.5-2.2 1.6a13 13 0 0 0 5.6 5.6l1.6-2.2L20 15v4a1.5 1.5 0 0 1-1.7 1.5C10.6 19.6 4.4 13.4 3.5 5.7A1.5 1.5 0 0 1 5 4Z" />
    </svg>
  );
}

export function MailIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4 7.5 8 6 8-6" />
    </svg>
  );
}

export function ClockIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2.5" />
    </svg>
  );
}

export function LeafIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M5 19C4 9 10 4 20 4c0 10-5 16-15 15Z" />
      <path d="M5 19c3-5 7-9 11-11" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.66 15L2 22l5.16-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.06.77.8-2.98-.2-.31A8.2 8.2 0 1 1 12 20.2Zm4.5-6.13c-.25-.12-1.47-.72-1.7-.8-.22-.09-.39-.13-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.35-2.93c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.43h-.47c-.16 0-.43.06-.65.3-.22.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.17 1.73 2.64 4.2 3.7.59.26 1.05.4 1.4.52.6.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29Z" />
    </svg>
  );
}
