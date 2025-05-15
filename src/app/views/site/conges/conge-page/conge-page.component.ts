import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { CongerService } from '../../../../core/services/conge/conger.service';
import { StatutConger, Conger } from '../../../../core/models/conge.model';
import { BreadcrumbComponent } from '../../../../components/breadcrumb/breadcrumb.component';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conge-page',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf, NgFor, BreadcrumbComponent, PaginationComponent],
  templateUrl: './conge-page.component.html',
  styleUrls: ['./conge-page.component.css']
})
export class CongePageComponent {
  private congeService = inject(CongerService);

  allDemandes: Conger[] = [];
  pagedDemandes: Conger[] = [];

  itemsPerPage = 5;
  currentPage = 1;
  totalItems = 0;

  constructor() {
    this.loadDemandes();
  }

  loadDemandes() {
    this.congeService.getAllCongers().subscribe({
      next: (data) => {
        this.allDemandes = data;
        this.totalItems = data.length;
        this.updatePagedDemandes();
      },
      error: () => {
        this.allDemandes = [];
        this.pagedDemandes = [];
        this.totalItems = 0;
      }
    });
  }

  updatePagedDemandes() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedDemandes = this.allDemandes.slice(start, end);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePagedDemandes();
  }

  getStatutLibelle(statut: StatutConger | undefined): string {
    if (!statut) return 'Non défini';
    switch (statut) {
      case StatutConger.ACCEPTE: return 'Accepté';
      case StatutConger.REFUSE: return 'Refusé';
      case StatutConger.EN_ATTENTE: return 'En attente';
      default: return '';
    }
  }

  getStatutStyle(statut: StatutConger | undefined): string {
    if (!statut) return 'text-gray-500';
    switch (statut) {
      case StatutConger.ACCEPTE: return 'text-green-600 font-semibold';
      case StatutConger.REFUSE: return 'text-red-600 font-semibold';
      case StatutConger.EN_ATTENTE: return 'text-yellow-600 font-semibold';
      default: return '';
    }
  }

  deleteDemande(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.congeService.deleteConger(id).subscribe({
          next: () => {
            this.allDemandes = this.allDemandes.filter(d => d.id !== id);
            this.totalItems = this.allDemandes.length;
            if ((this.currentPage - 1) * this.itemsPerPage >= this.totalItems) {
              this.currentPage = Math.max(1, this.currentPage - 1);
            }
            this.updatePagedDemandes();

            Swal.fire(
              'Supprimé !',
              'La demande a été supprimée avec succès.',
              'success'
            );
          },
          error: (err) => {
            console.error('Erreur lors de la suppression', err);
            Swal.fire(
              'Erreur',
              err.status === 404 ? 'Ce congé est introuvable ou déjà supprimé.' : 'Une erreur inconnue est survenue.',
              'error'
            );
          }
        });
      }
    });
  }
}
