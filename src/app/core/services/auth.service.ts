import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../models/user.model';

const ACCESS_KEY = 'cesci_access';
const REFRESH_KEY = 'cesci_refresh';
const USER_KEY = 'cesci_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSignal = signal<User | null>(this.readStoredUser());

  currentUser = this.currentUserSignal.asReadonly();
  isLoggedIn = computed(() => !!this.currentUserSignal());
  isBureau = computed(() => this.currentUserSignal()?.role === 'membre_bureau');
  mustChangePassword = computed(() => !!this.currentUserSignal()?.must_change_password);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  private readStoredUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  }

  login(email: string, matricule_cesci: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/login/`, { email, matricule_cesci, password })
      .pipe(
        tap((res) => {
          localStorage.setItem(ACCESS_KEY, res.access);
          localStorage.setItem(REFRESH_KEY, res.refresh);
          localStorage.setItem(USER_KEY, JSON.stringify(res.user));
          this.currentUserSignal.set(res.user);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
    this.currentUserSignal.set(null);
    this.router.navigate(['/connexion']);
  }

  forgotPassword(email: string): Observable<{ detail: string }> {
    return this.http.post<{ detail: string }>(`${environment.apiUrl}/auth/forgot-password/`, { email });
  }

  resetPassword(uid: string, token: string, new_password: string): Observable<{ detail: string }> {
    return this.http.post<{ detail: string }>(`${environment.apiUrl}/auth/reset-password/`, {
      uid,
      token,
      new_password,
    });
  }

  forceChangePassword(new_password: string): Observable<{ detail: string }> {
    return this.http
      .post<{ detail: string }>(`${environment.apiUrl}/auth/force-change-password/`, { new_password })
      .pipe(
        tap(() => {
          const user = this.currentUserSignal();
          if (user) {
            const updated = { ...user, must_change_password: false };
            localStorage.setItem(USER_KEY, JSON.stringify(updated));
            this.currentUserSignal.set(updated);
          }
        }),
      );
  }

  refreshProfile(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/auth/profile/`).pipe(
      tap((user) => {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        this.currentUserSignal.set(user);
      }),
    );
  }

  updateProfile(payload: { nom: string; prenom: string }): Observable<User> {
    return this.http.patch<User>(`${environment.apiUrl}/auth/profile/`, payload).pipe(
      tap((user) => {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        this.currentUserSignal.set(user);
      }),
    );
  }

  changePassword(old_password: string, new_password: string): Observable<{ detail: string }> {
    return this.http.post<{ detail: string }>(`${environment.apiUrl}/auth/change-password/`, {
      old_password,
      new_password,
    });
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_KEY);
  }

  setAccessToken(token: string): void {
    localStorage.setItem(ACCESS_KEY, token);
  }
}
