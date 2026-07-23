/** Separador de olas entre secciones. `fill` = color de la sección que viene DEBAJO. */
export default function WaveDivider({
  fill,
  flip = false,
  className = "",
}: {
  fill: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none -mb-px w-full overflow-hidden leading-none ${
        flip ? "rotate-180" : ""
      } ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="block h-[52px] w-full sm:h-[72px]"
      >
        <path
          d="M0,48 C180,88 360,8 540,32 C720,56 900,86 1080,64 C1260,42 1350,20 1440,44 L1440,90 L0,90 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
