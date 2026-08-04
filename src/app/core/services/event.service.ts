import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Event, EventRegistration } from '../models/event.model';
import { Paginated } from '../models/formation.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  private base = `${environment.apiUrl}/events`;

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Paginated<Event>> {
    return this.http.get<Paginated<Event>>(`${this.base}/`);
  }

  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.base}/${id}/`);
  }

  createEventForm(formData: FormData): Observable<Event> {
    return this.http.post<Event>(`${this.base}/`, formData);
  }

  updateEventForm(id: number, formData: FormData): Observable<Event> {
    return this.http.patch<Event>(`${this.base}/${id}/`, formData);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}/`);
  }

  register(eventId: number): Observable<EventRegistration> {
    return this.http.post<EventRegistration>(`${this.base}/${eventId}/register/`, {});
  }

  getRegistrations(eventId: number): Observable<EventRegistration[]> {
    return this.http.get<EventRegistration[]>(`${this.base}/${eventId}/registrations/`);
  }

  getMyRegistrations(): Observable<Paginated<EventRegistration>> {
    return this.http.get<Paginated<EventRegistration>>(`${this.base}/mes-inscriptions/`);
  }
}
