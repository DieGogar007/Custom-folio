# El Isótopo — Página de turismo

Sitio web de la agencia de turismo **El Isótopo** (Cartagena de Indias · Barú),
construido con **Next.js** y **Sanity CMS** para que todo el contenido —
imágenes, videos, textos y precios — sea editable sin tocar código.

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Abre <http://localhost:3000>. La página funciona de inmediato con **contenido
de ejemplo**; cuando conectes Sanity, el contenido real lo reemplaza.

## Conectar Sanity (el panel para editar contenido)

1. Crea una cuenta gratis en <https://www.sanity.io> y luego un proyecto en
   <https://www.sanity.io/manage> (dataset: `production`).
2. Copia el **Project ID** del proyecto.
3. Pégalo en el archivo `.env.local`:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. En <https://www.sanity.io/manage> → tu proyecto → **API → CORS origins**,
   agrega `http://localhost:3000` (y luego tu dominio de producción).
5. Reinicia el servidor (`npm run dev`) y entra a <http://localhost:3000/studio>.

## Qué se puede editar desde /studio

| Sección del panel | Qué controla |
| --- | --- |
| **Configuración del sitio** | Logo, **video de portada** (Cartagena + Barú), títulos, WhatsApp, teléfono, correo, dirección, redes sociales y las **fotos del punto de atención** |
| **Destinos increíbles** | Isla Palma, Palmarito Beach, Isla del Encanto, Bora Bora, Isla Capri, Isla Lisamar (fotos y textos) |
| **Paquetes exclusivos** | Full Day #1/#2/#3, Tour 4 Islas, Playa Tranquila VIP: precios, qué incluye, foto, orden |
| **Actividades ecológicas** | Oceanario, Mapache + Snorkeling, Aviario, Plancton Luminoso |
| **Experiencias** | Los videos con turistas de *Experiencias By Tpir Shekinah* |
| **Testimonios de clientes** | Reseñas con calificación de estrellas |
| **Turismo responsable** | Los logros de sostenibilidad |

> Mientras una sección no tenga contenido en Sanity, la página muestra el
> contenido de ejemplo definido en `lib/fallback.ts` (también editable ahí).

### Pasos recomendados al recibir el material del cliente

1. **Video de portada**: /studio → Configuración del sitio → *Video de portada*
   (el video panorámico de Cartagena con la Torre del Reloj y el mar de Barú).
   Sube también una *imagen de portada* para que se vea algo mientras carga.
2. **Logo**: mismo documento, campo *Logo principal*.
3. **WhatsApp real**: campo *WhatsApp* (todos los botones de reserva lo usan).
4. **Fotos de las islas**: crea un documento por destino con su foto.
5. **Videos de turistas**: crea documentos en *Experiencias*.

## Estructura

- `app/page.tsx` — página principal (todas las secciones)
- `app/catalogo/page.tsx` — catálogo completo de planes (enlazado en el menú)
- `app/studio/` — panel de contenido (Sanity Studio embebido)
- `components/` — secciones y piezas de UI
- `sanity/schemaTypes/` — modelos de contenido editables
- `lib/fallback.ts` — contenido de ejemplo mientras Sanity está vacío

## Publicar en producción

La forma más sencilla es [Vercel](https://vercel.com): importa el repositorio,
agrega las dos variables de entorno de `.env.local` y despliega. Recuerda
agregar el dominio final en los CORS origins de Sanity.
