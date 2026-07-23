import { defineField, defineType } from "sanity";

export const experiencia = defineType({
  name: "experiencia",
  title: "Experiencias (videos con turistas)",
  type: "document",
  description: "Videos y fotos de la marca Experiencias By Tpir Shekinah.",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "imagen",
      title: "Foto de portada del video",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "orden", title: "Orden", type: "number" }),
  ],
});
