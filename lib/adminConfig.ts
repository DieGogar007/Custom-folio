/**
 * Configuración del panel administrativo (/admin).
 * Define qué tipos de contenido se pueden editar y con qué campos.
 * La usan tanto los formularios del panel como la validación del servidor.
 */

export type CampoKind =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "lines" // lista de textos, uno por línea
  | "image"
  | "video";

export interface Campo {
  name: string;
  label: string;
  kind: CampoKind;
  help?: string;
  options?: { value: string; label: string }[];
}

export interface TipoDoc {
  /** _type del documento en Sanity */
  type: string;
  singular: string;
  plural: string;
  /** Campo que se muestra como título en la lista */
  titleField: string;
  fields: Campo[];
}

const ORDEN: Campo = {
  name: "orden",
  label: "Orden",
  kind: "number",
  help: "Número para ordenar (1 sale primero). Puede quedar vacío.",
};

export const TIPOS: TipoDoc[] = [
  {
    type: "paquete",
    singular: "Plan",
    plural: "Planes y tours",
    titleField: "nombre",
    fields: [
      { name: "nombre", label: "Nombre del plan", kind: "text" },
      {
        name: "categoria",
        label: "Categoría",
        kind: "select",
        options: [
          { value: "full-day", label: "Full Day" },
          { value: "tour", label: "Tour" },
          { value: "vip", label: "VIP" },
        ],
      },
      {
        name: "idealPara",
        label: "Ideal para…",
        kind: "text",
        help: "Ej: “Ideal plan de amigos o pareja”.",
      },
      { name: "descripcion", label: "Descripción", kind: "textarea" },
      {
        name: "incluye",
        label: "¿Qué incluye?",
        kind: "lines",
        help: "Escribe cada cosa incluida en una línea aparte.",
      },
      {
        name: "precio",
        label: "Precio",
        kind: "text",
        help: "Ej: “Desde $180.000 COP por persona” o “Consultar”.",
      },
      { name: "imagen", label: "Foto del plan", kind: "image" },
      {
        name: "destacado",
        label: "¿Destacado?",
        kind: "boolean",
        help: "Resalta la tarjeta en dorado y la muestra en grande.",
      },
      ORDEN,
    ],
  },
  {
    type: "actividad",
    singular: "Actividad",
    plural: "Actividades",
    titleField: "nombre",
    fields: [
      { name: "nombre", label: "Nombre", kind: "text" },
      { name: "descripcion", label: "Descripción", kind: "textarea" },
      {
        name: "precio",
        label: "Precio",
        kind: "text",
        help: "Ej: “Cargo adicional”.",
      },
      { name: "imagen", label: "Foto", kind: "image" },
      ORDEN,
    ],
  },
  {
    type: "testimonio",
    singular: "Comentario",
    plural: "Comentarios",
    titleField: "nombre",
    fields: [
      { name: "nombre", label: "Nombre del cliente", kind: "text" },
      {
        name: "procedencia",
        label: "Procedencia",
        kind: "text",
        help: "Ej: “Bogotá, Colombia”.",
      },
      { name: "texto", label: "Comentario", kind: "textarea" },
      {
        name: "calificacion",
        label: "Calificación (1 a 5)",
        kind: "number",
      },
      { name: "foto", label: "Foto (opcional)", kind: "image" },
      ORDEN,
    ],
  },
  {
    type: "logro",
    singular: "Cifra",
    plural: "Cifras de confianza",
    titleField: "titulo",
    fields: [
      {
        name: "cifra",
        label: "Cifra",
        kind: "text",
        help: "Ej: “+1.000” o “100%”. Se muestra en grande.",
      },
      { name: "titulo", label: "Título", kind: "text" },
      { name: "descripcion", label: "Descripción", kind: "textarea" },
      ORDEN,
    ],
  },
  {
    type: "destino",
    singular: "Destino",
    plural: "Destinos",
    titleField: "nombre",
    fields: [
      { name: "nombre", label: "Nombre de la isla o playa", kind: "text" },
      {
        name: "tagline",
        label: "Frase corta",
        kind: "text",
        help: "Ej: “Arena blanca y aguas cristalinas”.",
      },
      { name: "descripcion", label: "Descripción", kind: "textarea" },
      { name: "imagen", label: "Foto", kind: "image" },
      ORDEN,
    ],
  },
  {
    type: "experiencia",
    singular: "Experiencia",
    plural: "Experiencias en video",
    titleField: "titulo",
    fields: [
      { name: "titulo", label: "Título", kind: "text" },
      { name: "descripcion", label: "Descripción", kind: "textarea" },
      { name: "video", label: "Video", kind: "video" },
      { name: "imagen", label: "Foto de portada", kind: "image" },
      ORDEN,
    ],
  },
];

/** Campos editables de la configuración general del sitio (documento único). */
export const SETTINGS_FIELDS: Campo[] = [
  { name: "titulo", label: "Nombre de la agencia", kind: "text" },
  { name: "logo", label: "Logo", kind: "image" },
  { name: "heroTitulo", label: "Título de portada", kind: "text" },
  { name: "heroSubtitulo", label: "Frase de presentación", kind: "textarea" },
  {
    name: "heroVideo",
    label: "Video de portada",
    kind: "video",
    help: "Se reproduce en silencio y en bucle detrás del título.",
  },
  {
    name: "heroPoster",
    label: "Imagen de portada (mientras carga el video)",
    kind: "image",
  },
  { name: "marcaExperiencias", label: "Marca de experiencias", kind: "text" },
  {
    name: "whatsapp",
    label: "WhatsApp",
    kind: "text",
    help: "Con indicativo del país. Ej: +57 300 123 4567",
  },
  { name: "telefono", label: "Teléfono", kind: "text" },
  { name: "email", label: "Correo", kind: "text" },
  { name: "direccion", label: "Dirección", kind: "text" },
  {
    name: "horario",
    label: "Horario de atención",
    kind: "text",
    help: "Ej: “Lunes a domingo · 7:00 a.m. — 7:00 p.m.”",
  },
  { name: "instagram", label: "Instagram (enlace)", kind: "text" },
  { name: "facebook", label: "Facebook (enlace)", kind: "text" },
  { name: "tiktok", label: "TikTok (enlace)", kind: "text" },
];

export function tipoPorNombre(type: string): TipoDoc | undefined {
  return TIPOS.find((t) => t.type === type);
}
