import { defineField, defineType } from "sanity";

export const logro = defineType({
  name: "logro",
  title: "Turismo responsable — logros",
  type: "document",
  fields: [
    defineField({
      name: "cifra",
      title: "Cifra destacada",
      type: "string",
      description: "Ej: “+1.000”, “100%”, “0”.",
    }),
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
      rows: 3,
    }),
    defineField({ name: "orden", title: "Orden", type: "number" }),
  ],
});
