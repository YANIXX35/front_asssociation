import { Direction } from './user.model';

export interface Titulaire {
  id: number;
  poste: number;
  user: number | null;
  nom_affiche: string;
  nom_complet: string;
  date_debut: string;
  date_fin: string | null;
}

export interface Poste {
  id: number;
  titre: string;
  niveau: 1 | 2;
  direction: Direction | null;
  description_role: string;
  commissions_rattachees: string;
  ordre: number;
  titulaire_actuel: Titulaire | null;
}
