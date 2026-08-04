import { Direction } from './user.model';

export type Niveau = 'debutant' | 'intermediaire' | 'avance';
export type LessonType = 'video' | 'pdf' | 'texte';

export interface Lesson {
  id: number;
  formation: number;
  titre: string;
  ordre: number;
  type: LessonType;
  contenu_texte: string;
  fichier: string | null;
  video_url: string;
}

export interface Formation {
  id: number;
  titre: string;
  description: string;
  direction_organisatrice: Direction | null;
  image: string | null;
  niveau: Niveau;
  duree_heures: number;
  type_attestation: string;
  places_disponibles: number;
  actif: boolean;
  date_creation: string;
  nb_lecons: number;
  nb_inscrits: number;
  lessons?: Lesson[];
}

export interface Enrollment {
  id: number;
  formation: number;
  formation_detail: Formation;
  date_inscription: string;
  progression_pct: number;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
