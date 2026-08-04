export type ProductType = 'avantage' | 'produit_physique';
export type OrderMode = 'retrait' | 'livraison';
export type OrderStatut = 'en_attente' | 'validee' | 'livree';

export interface Product {
  id: number;
  nom: string;
  description: string;
  image: string | null;
  type: ProductType;
  prix: string | null;
  actif: boolean;
}

export interface Order {
  id: number;
  product: number;
  product_detail: Product;
  user: number;
  user_nom: string;
  user_prenom: string;
  user_matricule: string;
  mode: OrderMode;
  statut: OrderStatut;
  date: string;
}
