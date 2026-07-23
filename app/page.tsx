import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Destinations from "@/components/Destinations";
import Packages from "@/components/Packages";
import Experiences from "@/components/Experiences";
import Testimonials from "@/components/Testimonials";
import Location from "@/components/Location";
import Sustainability from "@/components/Sustainability";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getHomeData } from "@/lib/data";

export const revalidate = 60;

export default async function Home() {
  const data = await getHomeData();

  return (
    <>
      <Header settings={data.settings} />
      <main>
        <Hero settings={data.settings} />
        <Destinations destinos={data.destinos} />
        <Packages
          paquetes={data.paquetes}
          actividades={data.actividades}
          settings={data.settings}
        />
        <Experiences experiencias={data.experiencias} settings={data.settings} />
        <Testimonials testimonios={data.testimonios} />
        <Location settings={data.settings} />
        <Sustainability logros={data.logros} />
      </main>
      <Footer settings={data.settings} />
      <WhatsAppButton settings={data.settings} />
    </>
  );
}
