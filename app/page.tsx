import CardHero from "@/components/card/CardHero";
import ContactCard from "@/components/card/ContactCard";
import PlanesCompact from "@/components/card/PlanesCompact";
import TrustStrip from "@/components/card/TrustStrip";
import TestimonialsRail from "@/components/card/TestimonialsRail";
import LocationFinale from "@/components/card/LocationFinale";
import SquiggleDivider from "@/components/card/SquiggleDivider";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getHomeData } from "@/lib/data";

export const revalidate = 60;

/**
 * Home en formato tarjeta digital: una sola columna compacta pensada para
 * móvil. En escritorio la tarjeta flota centrada sobre un fondo decorativo.
 * El catálogo completo sigue viviendo en /catalogo.
 */
export default async function Home() {
  const data = await getHomeData();

  return (
    <>
      {/* Fondo decorativo, solo visible en escritorio */}
      <div className="pointer-events-none fixed inset-0 hidden sm:block" aria-hidden>
        <div className="absolute inset-0 bg-sand-2" />
        <div className="absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-lagoon/15 blur-3xl" />
        <div className="absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-coral/10 blur-3xl" />
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <main className="relative mx-auto w-full max-w-md bg-sand sm:my-8 sm:max-w-xl sm:overflow-hidden sm:rounded-[2.75rem] sm:shadow-[0_40px_90px_-30px_rgba(13,43,58,0.5)] sm:ring-1 sm:ring-ink/10">
        <CardHero settings={data.settings} />
        <ContactCard settings={data.settings} />
        <PlanesCompact
          paquetes={data.paquetes}
          actividades={data.actividades}
          settings={data.settings}
        />
        <SquiggleDivider />
        <TrustStrip logros={data.logros} />
        <TestimonialsRail testimonios={data.testimonios} />
        <SquiggleDivider />
        <LocationFinale settings={data.settings} />
      </main>

      <WhatsAppButton settings={data.settings} />
    </>
  );
}
