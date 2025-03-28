import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Injection du service AuthService
  const router = inject(Router); // Injection du Router
  console.log(authService.isAuthenticated());
  if (!authService.isAuthenticated()) {

    router.navigate(['/login']); // Redirection vers la page de login
    return false; // Empêche l'accès à la route
  }
  return true;
};
