export type Role = 'membre_bureau' | 'etudiant_membre';

export type Direction =
  | 'presidence'
  | 'rh'
  | 'marketing_communication'
  | 'insertion_professionnelle'
  | 'finances'
  | 'organisation'
  | 'projets_mentorat'
  | 'smart_tech_innovation';

export type StatutAdhesion = 'actif' | 'suspendu' | 'ancien_membre';

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  matricule_cesci: string;
  role: Role;
  direction: Direction | null;
  statut_adhesion: StatutAdhesion;
  photo_profil: string | null;
  date_creation_compte: string;
  is_active: boolean;
  must_change_password: boolean;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export const DIRECTION_LABELS: Record<Direction, string> = {
  presidence: 'Présidence',
  rh: 'Ressources humaines',
  marketing_communication: 'Marketing et communication',
  insertion_professionnelle: 'Insertion professionnelle',
  finances: 'Finances et comptabilité',
  organisation: 'Organisation',
  projets_mentorat: 'Projets et mentorat',
  smart_tech_innovation: 'Smart tech et innovation',
};
