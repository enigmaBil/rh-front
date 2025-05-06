import {Routes} from '@angular/router';

export const feuilleTempRoute: Routes = [
  {
    path: "",
    data: { breadcrumb: 'Liste des feuilles de temps', url: 'admin/feuille-temp' },
    loadComponent: () => import("./feuille-temp-page/feuille-temp-page.component").then(c => c.FeuilleTempPageComponent)
  },
  {
    path: ":id/edit",
    data: { breadcrumb: 'Modifier une feuille de temps' },
    loadComponent: () => import("./feuille-temp-update/feuille-temp-update.component").then(c => c.FeuilleTempUpdateComponent)
  },
  {
    path: ":id",
    data: { breadcrumb: 'Détails de la feuille de temps' },
    loadComponent: () => import("./feuille-temp-show/feuille-temp-show.component").then(c => c.FeuilleTempShowComponent)
  }
]
