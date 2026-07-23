/** Enlace a Google Maps para una dirección escrita */
export function mapsLink(direccion: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
}

/** Construye un enlace de WhatsApp con mensaje pre-escrito */
export function whatsappLink(numero: string | undefined, mensaje: string): string {
  const digits = (numero || "").replace(/\D/g, "");
  const text = encodeURIComponent(mensaje);
  return digits
    ? `https://wa.me/${digits}?text=${text}`
    : `https://wa.me/?text=${text}`;
}
