import { defineField, defineType } from "sanity";

export const testimonio = defineType({
  name: "testimonio",
  title: "Testimonios de clientes",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre del cliente",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "procedencia",
      title: "Ciudad / país",
      type: "string",
      description: "Ej: “Bogotá, Colombia”.",
    }),
    defineField({
      name: "texto",
      title: "Testimonio",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "calificacion",
      title: "Calificación (1 a 5)",
      type: "number",
      initialValue: 5,
      validation: (r) => r.min(1).max(5),
    }),
    defineField({
      name: "foto",
      title: "Foto (opcional)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "orden", title: "Orden", type: "number" }),
  ],
});
