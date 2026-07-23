import { groq } from "next-sanity";

export const settingsQuery = groq`*[_type == "siteSettings"][0]{
  titulo, heroTitulo, heroSubtitulo, marcaExperiencias,
  telefono, whatsapp, email, direccion, horario,
  instagram, facebook, tiktok,
  "logoUrl": logo.asset->url,
  "heroVideoUrl": heroVideo.asset->url,
  "heroPosterUrl": heroPoster.asset->url,
  "galeria": galeriaUbicacion[].asset->url
}`;

export const destinosQuery = groq`*[_type == "destino"] | order(orden asc){
  nombre, tagline, descripcion,
  "imagenUrl": imagen.asset->url
}`;

export const paquetesQuery = groq`*[_type == "paquete"] | order(orden asc){
  nombre, categoria, idealPara, descripcion, incluye, precio, destacado,
  "imagenUrl": imagen.asset->url
}`;

export const actividadesQuery = groq`*[_type == "actividad"] | order(orden asc){
  nombre, descripcion, precio,
  "imagenUrl": imagen.asset->url
}`;

export const experienciasQuery = groq`*[_type == "experiencia"] | order(orden asc){
  titulo, descripcion,
  "videoUrl": video.asset->url,
  "imagenUrl": imagen.asset->url
}`;

export const testimoniosQuery = groq`*[_type == "testimonio"] | order(orden asc){
  nombre, procedencia, texto, calificacion,
  "fotoUrl": foto.asset->url
}`;

export const logrosQuery = groq`*[_type == "logro"] | order(orden asc){
  cifra, titulo, descripcion
}`;
