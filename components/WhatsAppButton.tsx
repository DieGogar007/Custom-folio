import { WhatsAppIcon } from "./icons";
import { whatsappLink } from "@/lib/utils";
import type { Settings } from "@/lib/types";

export default function WhatsAppButton({ settings }: { settings: Settings }) {
  const wa = whatsappLink(
    settings.whatsapp,
    "¡Hola El Isótopo! Quiero información sobre sus tours."
  );

  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-15 w-15 items-center justify-center rounded-full bg-[#25d366] p-4 text-white shadow-xl shadow-black/25 transition hover:scale-110"
    >
      <span className="animate-ping-slow absolute inset-0 rounded-full bg-[#25d366]" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </a>
  );
}
