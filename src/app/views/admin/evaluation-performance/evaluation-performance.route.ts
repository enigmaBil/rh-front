import {Routes} from '@angular/router';

export const evaluationPerformanceRoute: Routes = [
  {
    path: "",
    loadComponent: () => import("./avaluation-performance-page/avaluation-performance-page.component").then(c => c.AvaluationPerformancePageComponent)
  },
  {
    path: "evaluations/add",
    loadComponent: () => import("./avaluation-performance-add/avaluation-performance-add.component").then(c => c.AvaluationPerformanceAddComponent)
  },
  {
    path: "evaluations/update/:id",
    loadComponent: () => import("./avaluation-performance-update/avaluation-performance-update.component").then(c => c.AvaluationPerformanceUpdateComponent)
  },
  {
    path: "evaluations/show/:id",
    loadComponent: () => import("./avaluation-performance-show/avaluation-performance-show.component").then(c => c.AvaluationPerformanceShowComponent)
  }
]
