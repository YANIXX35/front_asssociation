export type NiveauEtude = 'baccalaureat' | 'bac1' | 'bac2' | 'bac3' | 'master1' | 'master2' | 'autre';
export type StatutAdhesion = 'en_attente' | 'acceptee' | 'refusee';

export interface MembershipApplication {
  id: number;
  noms_prenoms: string;
  whatsapp: string;
  email: string;
  niveau_etude: NiveauEtude;
  niveau_etude_autre: string;
  filiere_etablissement: string;
  statut: StatutAdhesion;
  date_soumission: string;
}

export const NIVEAU_ETUDE_LABELS: Record<NiveauEtude, string> = {
  baccalaureat: 'Baccalauréat',
  bac1: 'BAC +1',
  bac2: 'BAC +2',
  bac3: 'BAC +3',
  master1: 'Master 1',
  master2: 'Master 2',
  autre: 'Autre',
};
