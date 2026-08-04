export interface AssociationInfo {
  id: number;
  nom_complet: string;
  date_creation: string | null;
  lieu_creation: string;
  president_nom: string;
  president_devise: string;
  vision: string;
  mission: string;
  valeurs: string;
  historique: string;
}

export type PartnerType = 'entreprise' | 'universite';

export interface Partner {
  id: number;
  nom: string;
  type: PartnerType;
  logo: string | null;
  lien: string;
  ordre: number;
}

export interface ContactInfo {
  id: number;
  adresse: string;
  telephone: string;
  email: string;
  horaires: string;
  latitude: number | null;
  longitude: number | null;
}
