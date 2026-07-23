/** Construye un enlace de WhatsApp con mensaje pre-escrito */
export function whatsappLink(numero: string | undefined, mensaje: string): string {
  const digits = (numero || "").replace(/\D/g, "");
  const text = encodeURIComponent(mensaje);
  return digits
    ? `https://wa.me/${digits}?text=${text}`
    : `https://wa.me/?text=${text}`;
}
