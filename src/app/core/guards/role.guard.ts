import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.getUserRole();

  if (role === 'EMPLOYE') {
    router.navigate(['/dashboard-employe']);
    return false;
  } else if (role === 'ADMIN' || role === 'RH') {
    router.navigate(['/dashboard-admin']);
    return false;
  }

  router.navigate(['/login']);
  return false;
};
