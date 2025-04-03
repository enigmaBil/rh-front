import {Routes} from '@angular/router';

export const employeRoute: Routes = [
  {
    path: "",
    loadComponent: () => import("./employe-page/employe-page.component").then(c => c.EmployePageComponent)
  },
  {
    path: "employes/add",
    loadComponent: () => import("./employe-create/employe-create.component").then(c => c.EmployeCreateComponent)

  },
  {
    path: "employes/update/:id",
    loadComponent: () => import("./employe-update/employe-update.component").then(c => c.EmployeUpdateComponent)
  },
  {
    path: "employes/show/:id",
    loadComponent: () => import("./employe-show/employe-show.component").then(c => c.EmployeShowComponent)
  }
]
