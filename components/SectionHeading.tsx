import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  sub,
  tone = "dark",
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  tone?: "dark" | "light";
  align?: "center" | "left";
}) {
  const isLight = tone === "light";
  return (
    <Reveal
      className={`mx-auto max-w-3xl ${
        align === "center" ? "text-center" : "text-left mx-0"
      }`}
    >
      <p
        className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] ${
          align === "center" ? "justify-center" : ""
        } ${isLight ? "text-lagoon" : "text-lagoon-2"}`}
      >
        <span className="inline-block h-px w-8 bg-current opacity-60" />
        {eyebrow}
        {align === "center" && (
          <span className="inline-block h-px w-8 bg-current opacity-60" />
        )}
      </p>
      <h2
        className={`font-display text-4xl font-medium leading-[1.08] sm:text-5xl ${
          isLight ? "text-foam" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`mt-5 text-lg leading-relaxed ${
            isLight ? "text-foam/70" : "text-ink/70"
          }`}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}
