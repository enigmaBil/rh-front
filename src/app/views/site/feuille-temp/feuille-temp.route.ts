import {Routes} from '@angular/router';

export const feuilleTempRoute: Routes = [
  {
    path: "",
    loadComponent: () => import("./feuille-temp-page/feuille-temp-page.component").then(c => c.FeuilleTempPageComponent)
  },
  {
    path: "add",
    loadComponent: () => import("./feuille-temp-create/feuille-temp-create.component").then(c => c.FeuilleTempCreateComponent)
  },
  {
    path: ":id/edit",
    loadComponent: () => import("./feuille-temp-update/feuille-temp-update.component").then(c => c.FeuilleTempUpdateComponent)
  },
  {
    path: ":id",
    loadComponent: () => import("./feuille-temp-show/feuille-temp-show.component").then(c => c.FeuilleTempShowComponent)
  }
]
