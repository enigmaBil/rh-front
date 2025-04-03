import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log(authService.isConnected());
  if (!authService.isConnected) {
    router.navigate(['/auth/login'], {queryParams:{returnUrl: state.url}});
    return false; // Empêche l'accès à la route
  }
  return true;
};
