/**
 * Textos fijos de la página en español e inglés.
 * El contenido cargado desde el panel (nombres de planes, descripciones…)
 * se muestra tal como lo escribió el administrador.
 */

export type Lang = "es" | "en";

export interface Textos {
  // Contacto
  llamar: string;
  correo: string;
  comoLlegar: string;
  catalogo: string;
  reservaWhatsApp: string;
  msgReserva: string;
  msgInfo: string;
  // Planes
  planesEyebrow: string;
  planesTitulo: [string, string, string]; // [antes, resaltado, después]
  planesHint: string;
  complementa: string;
  verCatalogo: string;
  incluye: string;
  precio: string;
  consultar: string;
  reservarWhatsApp: string;
  msgPlan: (nombre: string) => string;
  msgActividad: (nombre: string) => string;
  actividadChip: string;
  // Testimonios
  testimoniosEyebrow: string;
  testimoniosTitulo: [string, string, string];
  estrellas: string;
  // Ubicación
  ir: string;
  // Varios
  cerrar: string;
  chatWhatsApp: string;
  heroFallback: [string, string]; // [antes del resaltado, resaltado]
}

export const TEXTOS: Record<Lang, Textos> = {
  es: {
    llamar: "Llamar",
    correo: "Correo",
    comoLlegar: "Cómo llegar",
    catalogo: "Catálogo",
    reservaWhatsApp: "Reserva por WhatsApp",
    msgReserva: "¡Hola El Isótopo! Quiero reservar un tour.",
    msgInfo: "¡Hola El Isótopo! Quiero información sobre sus tours.",
    planesEyebrow: "Planes & Tours",
    planesTitulo: ["Elige tu día de ", "islas", ""],
    planesHint: "Toca un plan para ver detalles y reservar.",
    complementa: "Complementa tu plan",
    verCatalogo: "Ver el catálogo completo →",
    incluye: "Incluye",
    precio: "Precio",
    consultar: "Consultar",
    reservarWhatsApp: "Reservar por WhatsApp",
    msgPlan: (n) => `¡Hola El Isótopo! Quiero reservar el plan "${n}".`,
    msgActividad: (n) =>
      `¡Hola El Isótopo! Quiero agregar la actividad "${n}" a mi plan.`,
    actividadChip: "Actividad",
    testimoniosEyebrow: "Viajeros felices",
    testimoniosTitulo: ["Lo que ", "cuentan", " de nosotros"],
    estrellas: "estrellas",
    ir: "Ir",
    cerrar: "Cerrar",
    chatWhatsApp: "Chatear por WhatsApp",
    heroFallback: ["Del corazón de Cartagena ", "al azul de Barú"],
  },
  en: {
    llamar: "Call",
    correo: "Email",
    comoLlegar: "Directions",
    catalogo: "Catalog",
    reservaWhatsApp: "Book via WhatsApp",
    msgReserva: "Hi El Isótopo! I'd like to book a tour.",
    msgInfo: "Hi El Isótopo! I'd like some information about your tours.",
    planesEyebrow: "Plans & Tours",
    planesTitulo: ["Choose your ", "island", " day"],
    planesHint: "Tap a plan to see details and book.",
    complementa: "Add to your plan",
    verCatalogo: "See the full catalog →",
    incluye: "Includes",
    precio: "Price",
    consultar: "Ask us",
    reservarWhatsApp: "Book via WhatsApp",
    msgPlan: (n) => `Hi El Isótopo! I'd like to book the "${n}" plan.`,
    msgActividad: (n) => `Hi El Isótopo! I'd like to add the "${n}" activity to my plan.`,
    actividadChip: "Activity",
    testimoniosEyebrow: "Happy travelers",
    testimoniosTitulo: ["What travelers ", "say", " about us"],
    estrellas: "stars",
    ir: "Go",
    cerrar: "Close",
    chatWhatsApp: "Chat on WhatsApp",
    heroFallback: ["From the heart of Cartagena ", "to the blue of Barú"],
  },
};
