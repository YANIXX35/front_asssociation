import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const http = inject(HttpClient);
  const token = auth.getAccessToken();

  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const refresh = auth.getRefreshToken();
      if (error.status === 401 && refresh && !req.url.includes('/auth/refresh/') && !req.url.includes('/auth/login/')) {
        return http.post<{ access: string }>(`${environment.apiUrl}/auth/refresh/`, { refresh }).pipe(
          switchMap((res) => {
            auth.setAccessToken(res.access);
            const retryReq = req.clone({ setHeaders: { Authorization: `Bearer ${res.access}` } });
            return next(retryReq);
          }),
          catchError((refreshError) => {
            auth.logout();
            return throwError(() => refreshError);
          }),
        );
      }
      return throwError(() => error);
    }),
  );
};
