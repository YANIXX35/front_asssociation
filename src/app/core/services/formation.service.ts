import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Enrollment, Formation, Lesson, Paginated } from '../models/formation.model';

@Injectable({ providedIn: 'root' })
export class FormationService {
  private base = `${environment.apiUrl}/formations`;

  constructor(private http: HttpClient) {}

  getFormations(params: { direction?: string; niveau?: string; search?: string } = {}): Observable<Paginated<Formation>> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) httpParams = httpParams.set(key, value);
    });
    return this.http.get<Paginated<Formation>>(`${this.base}/`, { params: httpParams });
  }

  getFormation(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.base}/${id}/`);
  }

  createFormationForm(formData: FormData): Observable<Formation> {
    return this.http.post<Formation>(`${this.base}/`, formData);
  }

  updateFormationForm(id: number, formData: FormData): Observable<Formation> {
    return this.http.patch<Formation>(`${this.base}/${id}/`, formData);
  }

  deleteFormation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}/`);
  }

  enroll(formationId: number): Observable<Enrollment> {
    return this.http.post<Enrollment>(`${this.base}/${formationId}/enroll/`, {});
  }

  downloadAttestation(formationId: number): Observable<Blob> {
    return this.http.get(`${this.base}/${formationId}/attestation/`, { responseType: 'blob' });
  }

  getMyFormations(): Observable<Paginated<Enrollment>> {
    return this.http.get<Paginated<Enrollment>>(`${this.base}/mes-formations/`);
  }

  getLessons(formationId: number): Observable<Paginated<Lesson> | Lesson[]> {
    return this.http.get<Paginated<Lesson> | Lesson[]>(`${this.base}/lessons/`, { params: { formation: formationId } });
  }

  getLesson(id: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.base}/lessons/${id}/`);
  }

  createLessonForm(formData: FormData): Observable<Lesson> {
    return this.http.post<Lesson>(`${this.base}/lessons/`, formData);
  }

  deleteLesson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/lessons/${id}/`);
  }

  completeLesson(id: number, termine = true): Observable<{ detail: string; progression_pct: number }> {
    return this.http.patch<{ detail: string; progression_pct: number }>(`${this.base}/lessons/${id}/complete/`, {
      termine,
    });
  }
}
