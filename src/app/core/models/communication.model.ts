import { Direction } from './user.model';

export interface Announcement {
  id: number;
  titre: string;
  contenu: string;
  direction_cible: Direction | null;
  auteur: number | null;
  auteur_nom: string;
  auteur_prenom: string;
  date_publication: string;
}

export interface MentorAssignment {
  id: number;
  etudiant: number;
  etudiant_nom: string;
  etudiant_prenom: string;
  etudiant_matricule: string;
  mentor_nom: string;
  mentor_contact: string;
  notes: string;
  date_maj: string;
}
