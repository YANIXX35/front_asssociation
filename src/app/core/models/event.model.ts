import { Direction } from './user.model';

export interface Event {
  id: number;
  titre: string;
  date: string;
  lieu: string;
  description: string;
  affiche: string | null;
  direction_organisatrice: Direction | null;
  nb_inscrits: number;
}

export interface EventRegistration {
  id: number;
  event: number;
  event_detail: Event;
  user: number;
  user_nom: string;
  user_prenom: string;
  user_matricule: string;
  date_inscription: string;
}
