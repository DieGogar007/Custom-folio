import { defineField, defineType } from "sanity";

export const actividad = defineType({
  name: "actividad",
  title: "Actividades ecológicas (adicionales)",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
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
      name: "precio",
      title: "Precio adicional",
      type: "string",
      description: "Ej: “+$45.000 COP” o “Consultar”.",
    }),
    defineField({
      name: "imagen",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "orden", title: "Orden", type: "number" }),
  ],
});
