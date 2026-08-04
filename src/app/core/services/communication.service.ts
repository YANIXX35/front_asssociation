import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Announcement, MentorAssignment } from '../models/communication.model';
import { Paginated } from '../models/formation.model';

@Injectable({ providedIn: 'root' })
export class CommunicationService {
  private base = `${environment.apiUrl}/communication`;

  constructor(private http: HttpClient) {}

  getAnnouncements(): Observable<Paginated<Announcement>> {
    return this.http.get<Paginated<Announcement>>(`${this.base}/annonces/`);
  }

  createAnnouncement(payload: Partial<Announcement>): Observable<Announcement> {
    return this.http.post<Announcement>(`${this.base}/annonces/`, payload);
  }

  deleteAnnouncement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/annonces/${id}/`);
  }

  getMyMentor(): Observable<Paginated<MentorAssignment>> {
    return this.http.get<Paginated<MentorAssignment>>(`${this.base}/mentorat/mon-mentor/`);
  }

  getMentorAssignments(): Observable<Paginated<MentorAssignment>> {
    return this.http.get<Paginated<MentorAssignment>>(`${this.base}/mentorat/`);
  }

  createMentorAssignment(payload: Partial<MentorAssignment>): Observable<MentorAssignment> {
    return this.http.post<MentorAssignment>(`${this.base}/mentorat/`, payload);
  }

  updateMentorAssignment(id: number, payload: Partial<MentorAssignment>): Observable<MentorAssignment> {
    return this.http.patch<MentorAssignment>(`${this.base}/mentorat/${id}/`, payload);
  }
}
