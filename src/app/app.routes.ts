import { Routes } from '@angular/router';
import {congesRoute} from './views/conges/conge.route';
import {employeRoute} from './views/employes/employe.route';
import {dashboardRoute} from './views/dashboard/dashboard.route';
import {evaluationPerformanceRoute} from './views/evaluation-performance/evaluation-performance.route';
import {feuilleTempRoute} from './views/feuille-temp/feuille-temp.route';
import {authRoute} from './views/auth/auth.route';
import {authGuard} from './core/guards/auth.guard';
import {roleGuard} from './core/guards/role.guard';
import {BaseComponent} from './layouts/base/base.component';
import {EmployeDashboardComponent} from './views/dashboard/employe-dashboard/employe-dashboard.component';
import {AdminDashboardComponent} from './views/dashboard/admin-dashboard/admin-dashboard.component';
import {BaseEmployeComponent} from './layouts/base-employe/base-employe.component';
import {EmployeProfilComponent} from './views/profils/employe-profil/employe-profil.component';


export const routes: Routes = [
  // Routes d'authentification (publiques)
  {
    path: 'auth',
    children: authRoute,
  },
  //Routes protegées pour admin et rh
  {
    path: 'admin',
    loadComponent: () => import('./layouts/base/base.component').then(c => c.BaseComponent),
    canActivate: [authGuard],
    children: [
      // Dashboard Admin & RH (protégé)
      {
        path: 'dashboard',
        loadComponent: () => import('./views/dashboard/admin-dashboard/admin-dashboard.component').then(c=>c.AdminDashboardComponent),
        canActivate: [roleGuard],
        data:{roles: ["ADMIN", "RH"], breadcrumb: 'Dashboard'},
      },

      // Autres routes protégées accessibles selon le rôle
      {
        path: 'conges',
        children: congesRoute,
        canActivate: [roleGuard],
        data:{roles: ["ADMIN", "RH"], breadcrumb: 'Congés'},
      },
      {
        path: 'employes',
        children: employeRoute,
        canActivate: [roleGuard],
        data:{roles: ["ADMIN", "RH"], breadcrumb: 'Employés', url: 'admin/employes'},
      },
      {
        path: 'evaluation-performance',
        children: evaluationPerformanceRoute,
        canActivate: [roleGuard],
        data:{roles: ["ADMIN", "RH"]},
      },
      {
        path: 'feuille-temp',
        children: feuilleTempRoute,
        canActivate: [roleGuard],
        data:{roles: ["ADMIN", "RH"]},
      },
    ]
  },

  //Routes protégées pour employe
  {
    path: 'portal',
    component: BaseEmployeComponent,
    canActivate: [authGuard],
    children: [
      // Dashboard Employé (protégé)
      {
        path: 'home.face',
        component: EmployeDashboardComponent,
        canActivate: [roleGuard],
        data: {roles: ['EMPLOYE']}
      },

      // Autres routes protégées accessibles selon le rôle
      {
        path: 'profile',
        component: EmployeProfilComponent,
        canActivate: [roleGuard],
        data: {roles: ['EMPLOYE']}
      },
    ]
  },

  // Redirections
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  //{ path: '**', redirectTo: '/auth/login' },
];
