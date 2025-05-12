import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgIf, NgClass, AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { EvaluationPerformanceService } from '../../../../core/services/evaluation-performance/evaluation-performance.service';
import { UserService } from '../../../../core/services/user/user/service';
import { BreadcrumbComponent } from '../../../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-evaluation-performance-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, BreadcrumbComponent, NgIf, NgClass, AsyncPipe],
  templateUrl: './evaluation-performance-add.component.html',
  styleUrls: ['./evaluation-performance-add.component.css']
})
export class EvaluationPerformanceAddComponent implements OnInit {
  evaluationForm!: FormGroup;
  employes: any[] = [];
  loading$ = new BehaviorSubject<boolean>(false);
  errorMessage: string = '';
  isModalVisible = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private evaluationService: EvaluationPerformanceService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.evaluationForm = this.fb.group({
      employeId: [null, Validators.required],
      score: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      commentaire: ['', Validators.required],
      dateEvaluation: [null, Validators.required]
    });

    this.loadEmployes();
  }

  get employeCtrl(): FormControl {
    return this.evaluationForm.get('employeId') as FormControl;
  }

  get scoreCtrl(): FormControl {
    return this.evaluationForm.get('score') as FormControl;
  }

  get commentaireCtrl(): FormControl {
    return this.evaluationForm.get('commentaire') as FormControl;
  }

  get dateCtrl(): FormControl {
    return this.evaluationForm.get('dateEvaluation') as FormControl;
  }

  loadEmployes(): void {
    this.userService.getAllEmployes().subscribe({
      next: (data: any[]) => {
        this.employes = data;
      },
      error: (err) => {
        console.error('Erreur chargement employés :', err);
        this.errorMessage = 'Impossible de charger les employés.';
      }
    });
  }

  onSubmit(): void {
    if (this.evaluationForm.valid) {
      const payload = {
        ...this.evaluationForm.value,
        employeId: Number(this.evaluationForm.value.employeId),
        dateEvaluation: new Date(this.evaluationForm.value.dateEvaluation).toISOString()
      };

      this.loading$.next(true);

      this.evaluationService.create(payload).subscribe({
        next: () => {
          this.evaluationForm.reset();
          this.isModalVisible = true;
        },
        error: (err) => {
          console.error('Erreur lors de la soumission :', err);
          this.errorMessage = 'Erreur lors de la soumission. Veuillez réessayer.';
          this.loading$.next(false);
        },
        complete: () => this.loading$.next(false)
      });
    } else {
      this.evaluationForm.markAllAsTouched();
    }
  }

  closeModal() {
    this.isModalVisible = false;
    this.router.navigate(['/admin/evaluation-performance']);
  }
}
