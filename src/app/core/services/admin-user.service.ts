import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Paginated } from '../models/formation.model';
import { User } from '../models/user.model';

export interface CreateMemberPayload {
  nom: string;
  prenom: string;
  email: string;
  matricule_cesci: string;
  role: 'membre_bureau' | 'etudiant_membre';
  direction?: string | null;
}

export interface CreateMemberResponse extends User {
  temp_password: string;
}

@Injectable({ providedIn: 'root' })
export class AdminUserService {
  private base = `${environment.apiUrl}/auth/bureau/members`;

  constructor(private http: HttpClient) {}

  list(search?: string): Observable<Paginated<User> | User[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<Paginated<User> | User[]>(`${this.base}/`, { params });
  }

  update(id: number, payload: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.base}/${id}/`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}/`);
  }

  createMember(payload: CreateMemberPayload): Observable<CreateMemberResponse> {
    return this.http.post<CreateMemberResponse>(`${environment.apiUrl}/auth/bureau/create-member/`, payload);
  }
}
