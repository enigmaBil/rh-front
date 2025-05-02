import {Routes} from '@angular/router';

export const employeRoute: Routes = [
  {
    path: "",
    data: { breadcrumb: 'Liste des employés', url: 'admin/employes' },
    loadComponent: () => import("./employe-page/employe-page.component").then(c => c.EmployePageComponent)
  },
  {
    path: "add",
    data: { breadcrumb: 'Ajouter un employé', url: 'admin/employes/add' },
    loadComponent: () => import("./employe-create/employe-create.component").then(c => c.EmployeCreateComponent)

  },
  {
    path: ":id/edit",
    data: { breadcrumb: 'Modifier un employé' },
    loadComponent: () => import("./employe-update/employe-update.component").then(c => c.EmployeUpdateComponent)
  },
  {
    path: ":id",
    data: { breadcrumb: 'Détails de l\'employé' },
    loadComponent: () => import("./employe-show/employe-show.component").then(c => c.EmployeShowComponent)
  }
]
