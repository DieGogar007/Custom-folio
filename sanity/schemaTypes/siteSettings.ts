import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configuración del sitio",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Nombre de la agencia",
      type: "string",
      initialValue: "El Isótopo",
    }),
    defineField({
      name: "logo",
      title: "Logo principal",
      type: "image",
      description: "Logo de El Isótopo (PNG con fondo transparente ideal).",
    }),
    defineField({
      name: "heroVideo",
      title: "Video de portada",
      type: "file",
      options: { accept: "video/*" },
      description:
        "Video panorámico de Cartagena (Torre del Reloj) unido con el mar de Barú. Se reproduce en silencio y en bucle.",
    }),
    defineField({
      name: "heroPoster",
      title: "Imagen de portada (mientras carga el video)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroTitulo",
      title: "Título de portada",
      type: "string",
    }),
    defineField({
      name: "heroSubtitulo",
      title: "Subtítulo de portada",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "marcaExperiencias",
      title: "Marca de experiencias",
      type: "string",
      initialValue: "Experiencias By Tpir Shekinah",
      description: "Marca de los videos y fotos de la agencia con turistas.",
    }),
    defineField({ name: "telefono", title: "Teléfono", type: "string" }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      type: "string",
      description: "Número con indicativo de país, ej: +57 300 123 4567",
    }),
    defineField({ name: "email", title: "Correo", type: "string" }),
    defineField({ name: "direccion", title: "Dirección", type: "string" }),
    defineField({ name: "horario", title: "Horario de atención", type: "string" }),
    defineField({ name: "instagram", title: "Instagram (URL)", type: "url" }),
    defineField({ name: "facebook", title: "Facebook (URL)", type: "url" }),
    defineField({ name: "tiktok", title: "TikTok (URL)", type: "url" }),
    defineField({
      name: "galeriaUbicacion",
      title: "Fotos del lugar donde nos ubicamos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Se muestran en la sección de Atención Personalizada.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Configuración del sitio" }),
  },
});
