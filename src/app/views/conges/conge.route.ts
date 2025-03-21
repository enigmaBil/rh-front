import {Routes} from '@angular/router';

export const congesRoute: Routes = [
  {
    path: "conges",
    loadComponent: () => import("./conge-page/conge-page.component").then(c => c.CongePageComponent)
  },
  {
    path: "conges/add",
    loadComponent: () => import("./conge-add/conge-add.component").then(c => c.CongeAddComponent)

  },
  {
    path: "conges/update/:id",
    loadComponent: () => import("./conge-update/conge-update.component").then(c => c.CongeUpdateComponent)
  },
  {
    path: "conges/show/:id",
    loadComponent: () => import("./conge-show/conge-show.component").then(c => c.CongeShowComponent)
  }
]
