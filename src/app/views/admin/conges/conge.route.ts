import {Routes} from '@angular/router';

export const congesRoute: Routes = [
  {
    path: "",
    loadComponent: () => import("./conge-page/conge-page.component").then(c => c.CongePageComponent)
  },
  {
    path: "add",
    loadComponent: () => import("./conge-add/conge-add.component").then(c => c.CongeAddComponent)

  },
  {
    path: "update/:id",
    loadComponent: () => import("./conge-update/conge-update.component").then(c => c.CongeUpdateComponent)
  },
  {
    path: "show/:id",
    loadComponent: () => import("./conge-show/conge-show.component").then(c => c.CongeShowComponent)
  }
]
