import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { EvaluationPerformanceService } from '../../../../core/services/evaluation-performance/evaluation-performance.service';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../../../../components/breadcrumb/breadcrumb.component';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-evaluation-performance-page',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbComponent, PaginationComponent, FormsModule],
  templateUrl: './avaluation-performance-page.component.html',
  styleUrls: ['./avaluation-performance-page.component.css']
})
export class EvaluationPerformancePageComponent implements OnInit {
  evaluations: any[] = [];
  filteredEvaluations: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchQuery: string = '';

  constructor(
    private router: Router,
    private evaluationService: EvaluationPerformanceService
  ) {}

  ngOnInit(): void {
    this.fetchEvaluations();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.fetchEvaluations());
  }

  get paginatedEvaluations() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEvaluations.slice(start, start + this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  fetchEvaluations(): void {
    this.evaluationService.getAll().subscribe({
      next: (data) => {
        this.evaluations = Array.isArray(data)
          ? data.sort((a, b) => new Date(b.dateEvaluation).getTime() - new Date(a.dateEvaluation).getTime())
          : [];
        this.filterEvaluations();
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement des évaluations :', err);
        this.evaluations = [];
        this.filteredEvaluations = [];
      }
    });
  }

  filterEvaluations() {
    const query = this.searchQuery.trim().toLowerCase();

    if (query) {
      this.filteredEvaluations = this.evaluations.filter(evaluation =>
        (evaluation.commentaire && evaluation.commentaire.toLowerCase().includes(query)) ||
        (evaluation.score != null && evaluation.score.toString().includes(query)) ||
        (evaluation.dateEvaluation && new Date(evaluation.dateEvaluation).toLocaleDateString('fr-FR').includes(query))
      );
    } else {
      this.filteredEvaluations = [...this.evaluations];
    }

    this.currentPage = 1;
  }

  goToUpdatePage(id: number): void {
    this.router.navigate([`/admin/evaluation-performance/evaluations/update/${id}`]);
  }

  deleteEvaluation(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette évaluation ?')) {
      this.evaluationService.delete(id).subscribe({
        next: () => {
          this.fetchEvaluations();
        },
        error: (err) => {
          console.error('❌ Erreur lors de la suppression de l\'évaluation :', err);
        }
      });
    }
  }

  goToAddPage(): void {
    this.router.navigate(['/admin/evaluation-performance/evaluations/add']);
  }
}
