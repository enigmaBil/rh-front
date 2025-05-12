import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { EvaluationPerformanceService } from '../../../../core/services/evaluation-performance/evaluation-performance.service';
import { Evaluation } from '../../../../core/models/evaluation/model';
import { UserService } from '../../../../core/services/user/user/service';

@Component({
  selector: 'app-evaluation-performance-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './evaluation-performance-page.component.html',
  styleUrls: ['./evaluation-performance-page.component.css']
})
export class EmployeeEvaluationsComponent implements OnInit {
  evaluations: Evaluation[] = [];
  employeeId: number = 0;

  constructor(
    private readonly evaluationService: EvaluationPerformanceService,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const paramId = +params['id'];
      this.employeeId = paramId > 0 ? paramId : this.userService.getEmployeeId();
      console.log('[Evaluation Page] Employé ID détecté :', this.employeeId);

      if (this.employeeId > 0) {
        this.fetchEvaluations();
      } else {
        console.error('[Evaluation Page] ID employé non valide');
      }
    });
  }

  fetchEvaluations(): void {
    this.evaluationService.getEvaluationsByEmployeeId(this.employeeId).subscribe({
      next: (data) => {
        console.log('[Evaluation Page] Évaluations récupérées :', data);
        this.evaluations = data;
      },
      error: (err) => {
        console.error('[Evaluation Page] Erreur récupération évaluations :', err);
      }
    });
  }
}
