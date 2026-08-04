import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Application, JobOffer } from '../models/job-offer.model';
import { Paginated } from '../models/formation.model';

@Injectable({ providedIn: 'root' })
export class JobOfferService {
  private base = `${environment.apiUrl}/job-offers`;

  constructor(private http: HttpClient) {}

  getOffers(): Observable<Paginated<JobOffer>> {
    return this.http.get<Paginated<JobOffer>>(`${this.base}/`);
  }

  getOffer(id: number): Observable<JobOffer> {
    return this.http.get<JobOffer>(`${this.base}/${id}/`);
  }

  createOffer(payload: Partial<JobOffer>): Observable<JobOffer> {
    return this.http.post<JobOffer>(`${this.base}/`, payload);
  }

  updateOffer(id: number, payload: Partial<JobOffer>): Observable<JobOffer> {
    return this.http.patch<JobOffer>(`${this.base}/${id}/`, payload);
  }

  deleteOffer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}/`);
  }

  apply(offerId: number): Observable<Application> {
    return this.http.post<Application>(`${this.base}/${offerId}/apply/`, {});
  }

  getMyApplications(): Observable<Paginated<Application>> {
    return this.http.get<Paginated<Application>>(`${this.base}/mes-candidatures/`);
  }

  getApplications(offerId?: number): Observable<Paginated<Application>> {
    return this.http.get<Paginated<Application>>(`${this.base}/candidatures/`, {
      params: offerId ? { offer: offerId } : {},
    });
  }

  updateApplicationStatus(id: number, statut: string): Observable<Application> {
    return this.http.patch<Application>(`${this.base}/candidatures/${id}/`, { statut });
  }
}
