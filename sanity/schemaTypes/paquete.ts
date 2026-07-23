import { defineField, defineType } from "sanity";

export const paquete = defineType({
  name: "paquete",
  title: "Paquetes exclusivos",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre del plan",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categoria",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Full Day", value: "full-day" },
          { title: "Tour", value: "tour" },
          { title: "VIP", value: "vip" },
        ],
        layout: "radio",
      },
      initialValue: "full-day",
    }),
    defineField({
      name: "idealPara",
      title: "Ideal para…",
      type: "string",
      description: "Ej: “Ideal plan de amigos o pareja”.",
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "incluye",
      title: "¿Qué incluye?",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "precio",
      title: "Precio",
      type: "string",
      description: "Ej: “Desde $180.000 COP por persona” o “Consultar”.",
    }),
    defineField({
      name: "imagen",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "destacado",
      title: "¿Destacado?",
      type: "boolean",
      initialValue: false,
      description: "Resalta la tarjeta con estilo dorado (ej. planes VIP).",
    }),
    defineField({ name: "orden", title: "Orden", type: "number" }),
  ],
  orderings: [
    {
      title: "Por orden",
      name: "porOrden",
      by: [{ field: "orden", direction: "asc" }],
    },
  ],
});
