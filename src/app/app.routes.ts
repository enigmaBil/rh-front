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


export const routes: Routes = [
  // Routes d'authentification (publiques)
  {
    path: 'auth',
    children: authRoute,
  },

  // Redirection automatique après login selon le rôle
  // {
  //   path: '',
  //   canActivate: [roleGuard],
  // },

  {
    path: 'admin',
    component: BaseComponent,
    children: [
      // Dashboard Employé (protégé)
      {
        path: 'dashboard-employe',
        data:{
          role: "EMPLOYE",
        },
        children: dashboardRoute,
        canActivate: [roleGuard]
      },

      // Dashboard Admin & RH (protégé)
      {
        path: 'dashboard-admin',
        data:{role: ["ADMIN", "RH"]},
        children: dashboardRoute,
        canActivate: [roleGuard]
      },

      // Autres routes protégées accessibles selon le rôle
      {
        path: 'conges',
        children: congesRoute,
        //canActivate: [authGuard]
      },
      {
        path: 'employes',
        children: employeRoute,
        canActivate: [authGuard]
      },
      {
        path: 'evaluation-performance',
        children: evaluationPerformanceRoute,
        canActivate: [authGuard]
      },
      {
        path: 'feuille-temp',
        children: feuilleTempRoute,
        canActivate: [authGuard]
      },
    ]
  },

  // Redirections
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];
