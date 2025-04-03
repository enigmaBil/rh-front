import {ActivatedRoute, CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';
import {inject} from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const activedRoute = inject(ActivatedRoute);
  const router = inject(Router);

  const userRole = localStorage.getItem('userRole');
  const allowedRoles = route.data['roles']

  if (!allowedRoles.includes(userRole)) {
    router.navigate(['/access-denied']);
    return false;
  }

  return true;//autorise l'acces
};
