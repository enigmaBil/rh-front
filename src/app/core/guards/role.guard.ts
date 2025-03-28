import {ActivatedRoute, CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const activedRoute = inject(ActivatedRoute);
  const router = inject(Router);

  const role = authService.getUserRole();

  console.log(route.data);

  if (role === route.data['role']) {
    router.navigate(['/dashboard-employe']);
    return false;
  } else if (role === route.data['role'] || role === route.data['role']) {
    router.navigate(['/dashboard-admin']);
    return false;
  }

  router.navigate(['/login']);
  return false;
};
