import { defineField, defineType } from "sanity";

export const destino = defineType({
  name: "destino",
  title: "Destinos increíbles",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Frase corta",
      type: "string",
      description: "Ej: “Arena blanca y aguas cristalinas”.",
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "imagen",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "orden",
      title: "Orden",
      type: "number",
      description: "Posición en la página (1, 2, 3…).",
    }),
  ],
  orderings: [
    {
      title: "Por orden",
      name: "porOrden",
      by: [{ field: "orden", direction: "asc" }],
    },
  ],
});
