import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EvaluationPerformanceService } from '../../../../core/services/evaluation-performance/evaluation-performance.service';
import { UserService } from '../../../../core/services/user/user/service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-evaluation-performance-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './avaluation-performance-update.component.html',
  styleUrls: ['./avaluation-performance-update.component.css']
})
export class EvaluationPerformanceUpdateComponent implements OnInit {

  evaluationForm!: FormGroup;
  evaluationId!: number;
  employes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private evaluationService: EvaluationPerformanceService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.evaluationId = Number(this.route.snapshot.paramMap.get('id'));

    this.evaluationForm = this.fb.group({
      employeId: [{ value: null, disabled: true }, Validators.required],
      score: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      commentaire: ['', Validators.required],
      dateEvaluation: [null, Validators.required]
    });

    this.loadEmployes();
    this.loadEvaluation();
  }

  loadEmployes(): void {
    this.userService.getAllEmployes().subscribe({
      next: data => this.employes = data,
      error: err => console.error('Erreur chargement employés', err)
    });
  }

  loadEvaluation(): void {
    this.evaluationService.getById(this.evaluationId).subscribe({
      next: (data) => {
        this.evaluationForm.patchValue({
          employeId: data.employe?.id,
          score: data.score,
          commentaire: data.commentaire,
          dateEvaluation: data.dateEvaluation?.split('T')[0]
        });
      },
      error: (err) => {
        console.error('Erreur chargement évaluation', err);
      }
    });
  }

  onUpdate(): void {
    if (this.evaluationForm.valid) {
      const formValue = this.evaluationForm.getRawValue(); // to get disabled values
      const payload = {
        ...formValue,
        employeId: Number(formValue.employeId),
        dateEvaluation: new Date(formValue.dateEvaluation).toISOString()
      };

      this.evaluationService.update(this.evaluationId, payload).subscribe({
        next: () => {
          this.router.navigate(['/admin/evaluation-performance']);
        },
        error: (err) => {
          console.error('Erreur mise à jour :', err);
        }
      });
    }
  }
}
