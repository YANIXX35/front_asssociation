import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/connexion']);
    return false;
  }
  if (auth.mustChangePassword()) {
    router.navigate(['/changer-mot-de-passe']);
    return false;
  }
  return true;
};

export const bureauGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/connexion']);
    return false;
  }
  if (auth.mustChangePassword()) {
    router.navigate(['/changer-mot-de-passe']);
    return false;
  }
  if (!auth.isBureau()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    return true;
  }
  router.navigate(['/']);
  return false;
};

export const mustChangePasswordGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/connexion']);
    return false;
  }
  if (!auth.mustChangePassword()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
