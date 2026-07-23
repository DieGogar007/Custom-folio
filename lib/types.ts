export interface Settings {
  titulo: string;
  logoUrl?: string | null;
  heroVideoUrl?: string | null;
  heroPosterUrl?: string | null;
  heroTitulo?: string;
  heroSubtitulo?: string;
  marcaExperiencias: string;
  telefono?: string;
  whatsapp?: string;
  email?: string;
  direccion?: string;
  horario?: string;
  instagram?: string | null;
  facebook?: string | null;
  tiktok?: string | null;
  galeria?: (string | null)[] | null;
}

export interface Destino {
  nombre: string;
  tagline?: string;
  descripcion?: string;
  imagenUrl?: string | null;
}

export interface Paquete {
  nombre: string;
  categoria: "full-day" | "tour" | "vip";
  idealPara?: string;
  descripcion?: string;
  incluye?: string[];
  precio?: string;
  destacado?: boolean;
  imagenUrl?: string | null;
}

export interface Actividad {
  nombre: string;
  descripcion?: string;
  precio?: string;
  imagenUrl?: string | null;
}

export interface Experiencia {
  titulo: string;
  descripcion?: string;
  videoUrl?: string | null;
  imagenUrl?: string | null;
}

export interface Testimonio {
  nombre: string;
  procedencia?: string;
  texto: string;
  calificacion?: number;
  fotoUrl?: string | null;
}

export interface Logro {
  cifra?: string;
  titulo: string;
  descripcion?: string;
}

export interface HomeData {
  settings: Settings;
  destinos: Destino[];
  paquetes: Paquete[];
  actividades: Actividad[];
  experiencias: Experiencia[];
  testimonios: Testimonio[];
  logros: Logro[];
}
