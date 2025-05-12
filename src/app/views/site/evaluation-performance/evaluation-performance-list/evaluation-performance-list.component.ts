import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluationPerformanceService } from '../../../../core/services/evaluation-performance/evaluation-performance.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-evaluation-performance-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './evaluation-performance-list.component.html',
  styleUrls: ['./evaluation-performance-list.component.css']
})
export class EvaluationPerformanceListComponent implements OnInit {
  evaluations: any[] = [];

  constructor(private evaluationService: EvaluationPerformanceService) {}

  ngOnInit(): void {
    this.fetchEvaluations();
  }

  fetchEvaluations(): void {
    this.evaluationService.getAll().subscribe({
      next: (data) => {
        this.evaluations = Array.isArray(data)
          ? data.sort((a, b) =>
              new Date(b.dateEvaluation).getTime() - new Date(a.dateEvaluation).getTime()
            )
          : [];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des évaluations :', err);
      }
    });
  }
}
