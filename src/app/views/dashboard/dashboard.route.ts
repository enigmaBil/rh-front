import {Routes} from '@angular/router';

export const dashboardRoute: Routes = [
  {
    path: '',
    loadComponent: () => import("./employe-dashboard/employe-dashboard.component").then(c => c.EmployeDashboardComponent)
  },
  {
    path: '',
    loadComponent: () => import("./admin-dashboard/admin-dashboard.component").then(c => c.AdminDashboardComponent)
  }
]
