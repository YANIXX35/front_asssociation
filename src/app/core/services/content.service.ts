import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AssociationInfo, ContactInfo, Partner, PartnerType } from '../models/content.model';
import { Paginated } from '../models/formation.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private base = `${environment.apiUrl}/content`;

  constructor(private http: HttpClient) {}

  getAssociationInfo(): Observable<Paginated<AssociationInfo> | AssociationInfo[]> {
    return this.http.get<Paginated<AssociationInfo> | AssociationInfo[]>(`${this.base}/association-info/`);
  }

  getContactInfo(): Observable<Paginated<ContactInfo> | ContactInfo[]> {
    return this.http.get<Paginated<ContactInfo> | ContactInfo[]>(`${this.base}/contact-info/`);
  }

  createAssociationInfo(payload: Partial<AssociationInfo>): Observable<AssociationInfo> {
    return this.http.post<AssociationInfo>(`${this.base}/association-info/`, payload);
  }

  updateAssociationInfo(id: number, payload: Partial<AssociationInfo>): Observable<AssociationInfo> {
    return this.http.patch<AssociationInfo>(`${this.base}/association-info/${id}/`, payload);
  }

  createContactInfo(payload: Partial<ContactInfo>): Observable<ContactInfo> {
    return this.http.post<ContactInfo>(`${this.base}/contact-info/`, payload);
  }

  updateContactInfo(id: number, payload: Partial<ContactInfo>): Observable<ContactInfo> {
    return this.http.patch<ContactInfo>(`${this.base}/contact-info/${id}/`, payload);
  }

  getPartners(type?: PartnerType): Observable<Paginated<Partner>> {
    return this.http.get<Paginated<Partner>>(`${this.base}/partners/`, {
      params: type ? { type } : {},
    });
  }

  createPartnerForm(formData: FormData): Observable<Partner> {
    return this.http.post<Partner>(`${this.base}/partners/`, formData);
  }

  deletePartner(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/partners/${id}/`);
  }
}
