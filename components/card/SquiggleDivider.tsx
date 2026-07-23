/** Separador mínimo: una ola dibujada entre secciones de la tarjeta. */
export default function SquiggleDivider() {
  return (
    <div className="flex justify-center pt-9" aria-hidden>
      <svg viewBox="0 0 64 10" className="h-2.5 w-16 text-lagoon/50" fill="none">
        <path
          d="M1 5c5-5 10 5 15 0s10 5 15 0 10 5 15 0 10 5 16 0"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
