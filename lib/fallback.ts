import type { HomeData } from "./types";

/**
 * Contenido de ejemplo. Se muestra mientras el cliente no haya cargado
 * su propio contenido en Sanity Studio (/studio). Todo lo que aparece
 * aquí es 100% editable desde el panel sin tocar código.
 */
export const FALLBACK: HomeData = {
  settings: {
    titulo: "El Isótopo",
    marcaExperiencias: "Experiencias By Tpir Shekinah",
    heroTitulo: "Del corazón de Cartagena al azul de Barú",
    heroSubtitulo:
      "Tours en lancha, islas paradisíacas y planes hechos a tu medida, con la atención personalizada que nos hace únicos.",
    telefono: "+57 300 000 0000",
    whatsapp: "+57 300 000 0000",
    email: "reservas@elisotopo.com",
    direccion: "Centro Histórico, Cartagena de Indias, Colombia",
    horario: "Lunes a domingo · 7:00 a.m. — 7:00 p.m.",
    instagram: null,
    facebook: null,
    tiktok: null,
    galeria: null,
  },

  destinos: [
    { nombre: "Isla Palma", tagline: "Arena blanca y aguas cristalinas" },
    { nombre: "Palmarito Beach", tagline: "Relajo total frente al mar" },
    { nombre: "Isla del Encanto", tagline: "El clásico de las Islas del Rosario" },
    { nombre: "Bora Bora", tagline: "Beach club y buena energía" },
    { nombre: "Isla Capri", tagline: "Un rincón escondido del Caribe" },
    { nombre: "Isla Lisamar", tagline: "Naturaleza en estado puro" },
  ],

  paquetes: [
    {
      nombre: "Plan Full Day #1",
      categoria: "full-day",
      idealPara: "Ideal plan de amigos o pareja",
      descripcion:
        "Un día completo de sol, playa y mar en las islas, pensado para disfrutar en pareja o con tu parche de amigos.",
      incluye: [
        "Transporte en lancha ida y regreso",
        "Almuerzo típico isleño",
        "Tiempo libre de playa y mar",
        "Acompañamiento de nuestro equipo",
      ],
      precio: "Consultar",
    },
    {
      nombre: "Plan Full Day #2",
      categoria: "full-day",
      idealPara: "Ideal plan familiar",
      descripcion:
        "La experiencia perfecta para compartir en familia: playas tranquilas, comida deliciosa y cero preocupaciones.",
      incluye: [
        "Transporte en lancha ida y regreso",
        "Almuerzo típico isleño",
        "Zonas de playa aptas para niños",
        "Acompañamiento de nuestro equipo",
      ],
      precio: "Consultar",
    },
    {
      nombre: "Plan Full Day #3",
      categoria: "full-day",
      idealPara: "Plan familiar",
      descripcion:
        "Otra forma de vivir las islas en familia, con un itinerario relajado y playas de aguas calmadas.",
      incluye: [
        "Transporte en lancha ida y regreso",
        "Almuerzo típico isleño",
        "Tiempo libre de playa y mar",
        "Acompañamiento de nuestro equipo",
      ],
      precio: "Consultar",
    },
    {
      nombre: "Tour 4 Islas",
      categoria: "tour",
      idealPara: "Grupos de amigos, corporativos y amantes de la adrenalina",
      descripcion:
        "Recorre cuatro islas en un solo día a pura velocidad: paradas para nadar, fotos increíbles y mucha emoción.",
      incluye: [
        "Recorrido en lancha rápida por 4 islas",
        "Paradas para nadar y tomar fotos",
        "Almuerzo típico isleño",
        "Ideal para grupos y empresas",
      ],
      precio: "Consultar",
    },
    {
      nombre: "Playa Tranquila VIP",
      categoria: "vip",
      idealPara: "Para quienes buscan solo tranquilidad",
      descripcion:
        "Un rincón exclusivo y silencioso del Caribe: cama de playa, atención preferencial y el mar solo para ti.",
      incluye: [
        "Zona de playa exclusiva y tranquila",
        "Atención preferencial VIP",
        "Almuerzo especial",
        "Transporte en lancha ida y regreso",
      ],
      precio: "Consultar",
      destacado: true,
    },
  ],

  actividades: [
    {
      nombre: "Oceanario + Ticket",
      descripcion: "Conoce de cerca la vida marina del Parque Corales del Rosario.",
      precio: "Cargo adicional",
    },
    {
      nombre: "Mapache + Snorkeling",
      descripcion: "Careteo entre peces de colores y un encuentro inolvidable.",
      precio: "Cargo adicional",
    },
    {
      nombre: "Aviario + Ticket",
      descripcion: "Más de 190 especies de aves en pleno bosque de Barú.",
      precio: "Cargo adicional",
    },
    {
      nombre: "Plancton Luminoso",
      descripcion: "Nada de noche entre destellos de luz natural. Pura magia.",
      precio: "Cargo adicional",
    },
  ],

  experiencias: [
    {
      titulo: "Tu historia, en video",
      descripcion:
        "Nuestro equipo te acompaña durante el tour y captura tus mejores momentos.",
    },
    {
      titulo: "Recuerdos en movimiento",
      descripcion:
        "Videos y fotos profesionales de tu día en las islas, listos para compartir.",
    },
    {
      titulo: "El mejor día, en 60 segundos",
      descripcion:
        "Un video-resumen con la esencia de tu aventura por el Caribe.",
    },
  ],

  testimonios: [
    {
      nombre: "Contenido de ejemplo",
      procedencia: "Edítalo en el panel /studio",
      texto:
        "“Un día espectacular en las islas. La atención fue de primera desde la reserva hasta el regreso. ¡Repetiremos!”",
      calificacion: 5,
    },
    {
      nombre: "Contenido de ejemplo",
      procedencia: "Edítalo en el panel /studio",
      texto:
        "“El Tour 4 Islas superó nuestras expectativas: velocidad, playas hermosas y un equipo que se nota que ama lo que hace.”",
      calificacion: 5,
    },
    {
      nombre: "Contenido de ejemplo",
      procedencia: "Edítalo en el panel /studio",
      texto:
        "“Playa Tranquila VIP es otro nivel. Silencio, mar cristalino y una atención personalizada increíble.”",
      calificacion: 5,
    },
  ],

  logros: [
    {
      cifra: "100%",
      titulo: "Operadores locales",
      descripcion:
        "Trabajamos con lancheros, guías y cocineras nativas de Barú y las islas.",
    },
    {
      cifra: "0",
      titulo: "Plásticos de un solo uso",
      descripcion:
        "Promovemos playas limpias y tours libres de plástico desechable.",
    },
    {
      cifra: "6",
      titulo: "Ecosistemas que cuidamos",
      descripcion:
        "Apoyamos la conservación del Parque Nacional Corales del Rosario y San Bernardo.",
    },
    {
      cifra: "+1.000",
      titulo: "Viajeros responsables",
      descripcion:
        "Cada visita aporta al turismo sostenible de nuestras comunidades.",
    },
  ],
};
