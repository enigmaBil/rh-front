import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Conger, StatutConger } from '../../../../core/models/conge.model';
import { CongerService } from '../../../../core/services/conge/conger.service';
import { BreadcrumbComponent } from '../../../../components/breadcrumb/breadcrumb.component';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';

@Component({
  selector: 'app-conge-page',
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbComponent, PaginationComponent],
  templateUrl: './conge-page.component.html',
  styleUrls: ['./conge-page.component.css']
})
export class CongePageComponent implements OnInit {
  congers: Conger[] = [];
  allCongers: Conger[] = [];
  itemsPerPage = 5;
  currentPage = 1;
  searchText = '';
  StatutConger = StatutConger;

  constructor(private congerService: CongerService) { }

  ngOnInit(): void {
    this.getCongers();
  }

  getCongers(): void {
    this.congerService.getAllCongers().subscribe(data => {
      this.allCongers = data.filter(c => c.statut === StatutConger.EN_ATTENTE);
      this.applySearch();
    });
  }

  updateStatut(id: number, statut: 'accepte' | 'refuse') {
    const statusEnum = statut === 'accepte' ? StatutConger.ACCEPTE : StatutConger.REFUSE;
    this.congerService.updateStatut(id, statusEnum).subscribe({
      next: (res) => {
        console.log('Mise à jour réussie', res);

        // Mettre à jour dans allCongers
        const index = this.allCongers.findIndex(c => c.id === id);
        if (index !== -1) {
          this.allCongers[index].statut = statusEnum;
        }

        // Réappliquer la recherche et pagination proprement
        this.applySearch();
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du statut', err);
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  search(): void {
    this.applySearch();
  }

  private applySearch(): void {
    if (this.searchText) {
      this.congers = this.allCongers.filter(c =>
        c.nom.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.congers = [...this.allCongers];
    }
  }

  get paginatedCongers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.congers.slice(startIndex, endIndex);
  }
}
