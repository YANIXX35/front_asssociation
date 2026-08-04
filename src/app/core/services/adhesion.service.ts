import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MembershipApplication } from '../models/adhesion.model';
import { Paginated } from '../models/formation.model';

@Injectable({ providedIn: 'root' })
export class AdhesionService {
  private base = `${environment.apiUrl}/adhesions`;

  constructor(private http: HttpClient) {}

  submit(payload: Partial<MembershipApplication>): Observable<MembershipApplication> {
    return this.http.post<MembershipApplication>(`${this.base}/`, payload);
  }

  list(): Observable<Paginated<MembershipApplication>> {
    return this.http.get<Paginated<MembershipApplication>>(`${this.base}/`);
  }

  updateStatus(id: number, statut: string): Observable<MembershipApplication> {
    return this.http.patch<MembershipApplication>(`${this.base}/${id}/`, { statut });
  }
}
