import { Routes } from '@angular/router';
import {authRoute} from './views/auth/auth.route';
import {authGuard} from './core/guards/auth.guard';
import {roleGuard} from './core/guards/role.guard';
import {BaseComponent} from './layouts/base/base.component';
import { congesRoute } from './views/admin/conges/conge.route';
import { employeRoute } from './views/admin/employes/employe.route';
import { evaluationPerformanceRoute } from './views/admin/evaluation-performance/evaluation-performance.route';
import { feuilleTempRoute } from './views/admin/feuille-temp/feuille-temp.route';
import { BaseEmployeComponent } from './layouts/base-employe/base-employe.component';
import { EmployeDashboardComponent } from './views/site/dashboard/employe-dashboard.component';
import { EmployeProfilComponent } from './views/site/profil/employe-profil.component';


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
        loadComponent: () => import('./views/admin/admin-dashboard/admin-dashboard.component').then(c=>c.AdminDashboardComponent),
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

      {
        path: 'feuille-temp',
        canActivate: [roleGuard],
        data: {roles: ['EMPLOYE']},
        children: [
          {
            path: "",
            loadComponent: () => import("./views/site/feuille-temp/feuille-temp-page/feuille-temp-page.component").then(c => c.FeuilleTempPageComponent)
          },
          {
            path: "add",
            loadComponent: () => import("./views/site/feuille-temp/feuille-temp-create/feuille-temp-create.component").then(c => c.FeuilleTempCreateComponent)
          },
          {
            path: ":id/edit",
            loadComponent: () => import("./views/site/feuille-temp/feuille-temp-update/feuille-temp-update.component").then(c => c.FeuilleTempUpdateComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./views/site/feuille-temp/feuille-temp-show/feuille-temp-show.component").then(c => c.FeuilleTempShowComponent)
          }
        ]
      },
      {
        path: 'conges',
        canActivate: [roleGuard],
        data: {roles: ['EMPLOYE']},
        children: [
          {
            path: "",
            loadComponent: () => import("./views/site/conges/conge-page/conge-page.component").then(c => c.CongePageComponent)
          },
          {
            path: "add",
            loadComponent: () => import("./views/site/conges/conge-add/conge-add.component").then(c => c.CongeAddComponent)
          },
          {
            path: ":id/edit",
            loadComponent: () => import("./views/site/conges/conge-update/conge-update.component").then(c => c.CongeUpdateComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./views/site/conges/conge-show/conge-show.component").then(c => c.CongeShowComponent)
          }
        ]
      },
      {
        path: 'evaluation-performance',
        canActivate: [roleGuard],
        data: {roles: ['EMPLOYE']},
        children: [
          {
            path: "",
            loadComponent: () => import("./views/site/evaluation-performance/evaluation-performance-page/evaluation-performance-page.component").then(c => c.EvaluationPerformancePageComponent)
          },
          {
            path: "add",
            loadComponent: () => import("./views/site/evaluation-performance/evaluation-performance-add/evaluation-performance-add.component").then(c => c.EvaluationPerformanceAddComponent)
          },
          {
            path: ":id/edit",
            loadComponent: () => import("./views/site/evaluation-performance/evaluation-performance-update/evaluation-performance-update.component").then(c => c.EvaluationPerformanceUpdateComponent)
          },
          {
            path: ":id",
            loadComponent: () => import("./views/site/evaluation-performance/evaluation-performance-show/evaluation-performance-show.component").then(c => c.EvaluationPerformanceShowComponent)
          }
        ]
      },
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
