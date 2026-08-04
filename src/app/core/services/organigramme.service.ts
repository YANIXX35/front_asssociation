import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Poste, Titulaire } from '../models/organigramme.model';
import { Paginated } from '../models/formation.model';

@Injectable({ providedIn: 'root' })
export class OrganigrammeService {
  private base = `${environment.apiUrl}/organigramme`;

  constructor(private http: HttpClient) {}

  getPostes(): Observable<Paginated<Poste> | Poste[]> {
    return this.http.get<Paginated<Poste> | Poste[]>(`${this.base}/postes/`);
  }

  createPoste(payload: Partial<Poste>): Observable<Poste> {
    return this.http.post<Poste>(`${this.base}/postes/`, payload);
  }

  updatePoste(id: number, payload: Partial<Poste>): Observable<Poste> {
    return this.http.patch<Poste>(`${this.base}/postes/${id}/`, payload);
  }

  deletePoste(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/postes/${id}/`);
  }

  createTitulaire(payload: Partial<Titulaire>): Observable<Titulaire> {
    return this.http.post<Titulaire>(`${this.base}/titulaires/`, payload);
  }

  endTitulaire(id: number, date_fin: string): Observable<Titulaire> {
    return this.http.patch<Titulaire>(`${this.base}/titulaires/${id}/`, { date_fin });
  }
}
