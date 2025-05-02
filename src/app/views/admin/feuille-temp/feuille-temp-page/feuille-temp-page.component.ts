import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FeuilleTempsService } from '../../../../core/services/feuille-temps/feuille-temps.service';

@Component({
  selector: 'app-feuille-temp-page',
  imports: [],
  templateUrl: './feuille-temp-page.component.html',
  styleUrl: './feuille-temp-page.component.css'
})
export class FeuilleTempPageComponent {
  timeSheets: any[] = [];
  filteredTimeSheets: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  timeSheetToDelete: number | null = null;
  searchQuery: string = '';


  private feuilleTempsService = inject(FeuilleTempsService);
  private router = inject(Router); 
  
    ngOnInit(): void {
      this.loadTimeSheets();
    }

  loadTimeSheets() {
    this.feuilleTempsService.getAllFeuilleTemps().subscribe((data: any[]) => {
      console.log(data);
      this.timeSheets = data;
      this.filteredTimeSheets = data; // Initialize filteredTimeSheets with all time sheets
    });
  }
}
