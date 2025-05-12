import { Routes } from '@angular/router';

export const evaluationPerformanceRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./avaluation-performance-page/avaluation-performance-page.component')
      .then(c => c.EvaluationPerformancePageComponent) // ✅ correction ici
  },
  {
    path: 'evaluations/add',
    loadComponent: () => import('./evaluation-performance-add/evaluation-performance-add.component')
      .then(c => c.EvaluationPerformanceAddComponent)
  },
  {
    path: 'evaluations/update/:id', 
    loadComponent: () => import('./avaluation-performance-update/avaluation-performance-update.component')
      .then(c => c.EvaluationPerformanceUpdateComponent)
  }
  , 
     
  {
    path: "evaluations/show/:id",
    loadComponent: () => import("./avaluation-performance-show/avaluation-performance-show.component")
      .then(c => c.AvaluationPerformanceShowComponent)
  },
];
