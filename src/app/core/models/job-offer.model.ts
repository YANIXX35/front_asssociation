import { Direction } from './user.model';

export type TypeContrat = 'stage' | 'emploi' | 'formation';
export type StatutCandidature = 'en_attente' | 'vue' | 'retenue' | 'refusee';

export interface JobOffer {
  id: number;
  titre: string;
  entreprise: string;
  type_contrat: TypeContrat;
  description: string;
  date_limite: string | null;
  direction_publication: Direction | null;
  actif: boolean;
  date_creation: string;
}

export interface Application {
  id: number;
  offer: number;
  offer_detail: JobOffer;
  user: number;
  user_nom: string;
  user_prenom: string;
  user_matricule: string;
  statut: StatutCandidature;
  date: string;
}
