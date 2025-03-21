import { Routes } from '@angular/router';
import {congesRoute} from './views/conges/conge.route';
import {employeRoute} from './views/employes/employe.route';
import {dashboardRoute} from './views/dashboard/dashboard.route';
import {evaluationPerformanceRoute} from './views/evaluation-performance/evaluation-performance.route';
import {feuilleTempRoute} from './views/feuille-temp/feuille-temp.route';
import {authRoute} from './views/auth/auth.route';


export const routes: Routes = [
  {
    path: '',
    children: authRoute,
  },
  {
    path: '',
    children: dashboardRoute,
  },
  {
    path:'',
    children: congesRoute
  },
  {
    path:'',
    children: employeRoute
  },
  {
    path:'',
    children: evaluationPerformanceRoute
  },
  {
    path:'',
    children: feuilleTempRoute
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
