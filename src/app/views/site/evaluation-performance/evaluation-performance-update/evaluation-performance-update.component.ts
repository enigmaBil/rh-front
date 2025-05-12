import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationPerformanceService } from '../../../../core/services/evaluation-performance/evaluation-performance.service';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzMessageModule } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-evaluation-performance-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzMessageModule],
  templateUrl: './evaluation-performance-update.component.html'
})
export class EvaluationPerformanceUpdateComponent implements OnInit {
  evaluationForm!: FormGroup;
  evaluationId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private evaluationService: EvaluationPerformanceService,
    private message: NzMessageService 
  ) {}

  ngOnInit(): void {
    this.evaluationId = Number(this.route.snapshot.paramMap.get('id'));

    this.evaluationForm = this.fb.group({
      score: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      commentaire: ['', Validators.required],
      dateEvaluation: [null, Validators.required]
    });

    this.evaluationService.getById(this.evaluationId).subscribe({
      next: (data) => this.evaluationForm.patchValue(data),
      error: () => this.message.error("❌ Erreur lors du chargement de l'évaluation")
    });
  }

  onSubmit(): void {
    if (this.evaluationForm.valid) {
      this.evaluationService.update(this.evaluationId, this.evaluationForm.value).subscribe({
        next: () => {
          this.message.success("✅ Évaluation mise à jour");
          this.router.navigate(['/portal/evaluation-performance']);
        },
        error: () => this.message.error("❌ Erreur lors de la mise à jour")
      });
    } else {
      this.evaluationForm.markAllAsTouched();
    }
  }
}
