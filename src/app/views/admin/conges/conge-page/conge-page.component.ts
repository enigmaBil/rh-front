import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms'; 
import { Conger, StatutConger } from '../../../../core/models/conge.model';
import { CongerService } from '../../../../core/services/conge/conger.service';
import { BreadcrumbComponent } from '../../../../components/breadcrumb/breadcrumb.component';


@Component({
  selector: 'app-conge-page',
  standalone: true, 
  imports: [
    CommonModule,  
    FormsModule,   
    BreadcrumbComponent 
  ],
  templateUrl: './conge-page.component.html',
  styleUrls: ['./conge-page.component.css']
})
export class CongePageComponent implements OnInit {
  congers: Conger[] = [];
  itemsPerPage: number = 10;
  currentPage: number = 1;
  searchText: string = '';


  StatutConger = StatutConger;

  constructor(private congerService: CongerService) { }

  ngOnInit(): void {
    this.getCongers();
  }

  // Récupération des congés en attente
  getCongers(): void {
    this.congerService.getAllCongers().subscribe((data) => {
      this.congers = data.filter(conger => conger.statut === StatutConger.EN_ATTENTE); 
      this.applySearch(); // Applique la recherche si elle est définie
    });
  }

  // Mise à jour du statut du congé
  updateStatut(id: number, statut: StatutConger): void {
    if (id !== undefined) { // Vérifiez que l'ID est valide
      this.congerService.updateStatut(id, statut).subscribe(() => {
        this.getCongers(); // Actualise la liste après la mise à jour
      });
    }
  }

  // Gestion du changement de page
  onPageChange(page: number): void {
    this.currentPage = page;
  }

  // Fonction de recherche
  search(): void {
    this.applySearch(); 
  }

  // (filtrage des congés)
  private applySearch(): void {
    if (this.searchText) {
      // Filtrage des congés selon le texte de recherche
      this.congers = this.congers.filter(conger => conger.nom.toLowerCase().includes(this.searchText.toLowerCase()));
    } else {
      // Si la recherche est vide, on réinitialise la liste des congés
      this.getCongers();
    }
  }
}
