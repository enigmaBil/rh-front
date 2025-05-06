import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FeuilleTempsService } from '../../../../core/services/feuille-temps/feuille-temps.service';
import { TimeSheet } from '../../../../core/models/timesheet';
import { BreadcrumbComponent } from "../../../../components/breadcrumb/breadcrumb.component";
import { PaginationComponent } from "../../../../components/pagination/pagination.component";
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-feuille-temp-page',
  imports: [BreadcrumbComponent, PaginationComponent, RouterLink, DatePipe, NgClass, FormsModule],
  templateUrl: './feuille-temp-page.component.html',
  styleUrl: './feuille-temp-page.component.css'
})
export class FeuilleTempPageComponent {
  timeSheets: TimeSheet[] = [];
  filteredTimeSheets: TimeSheet[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  timeSheetToDelete: number | null = null;
  searchQuery: string = '';


  private feuilleTempsService = inject(FeuilleTempsService);
  private router = inject(Router); 
  
    ngOnInit(): void {
      this.loadTimeSheets();
    }

  loadTimeSheets() {
    this.feuilleTempsService.getAllFeuilleTemps().subscribe((data: TimeSheet[]) => {
      console.log(data);
      this.timeSheets = data;
      this.filteredTimeSheets = data; // Initialize filteredTimeSheets with all time sheets
    });
  }

  get paginatedTimeSheets() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredTimeSheets.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  filterTimeSheets() {
    const query = this.searchQuery.toUpperCase();
    if (query) {
      this.filteredTimeSheets = this.timeSheets.filter(timeSheet => 
        timeSheet.status.toUpperCase().includes(query) 
      );
      console.log(query);
    } else {
      this.filteredTimeSheets = this.timeSheets; // Reset to all time sheets if search query is empty
    }
  }

  deleteTimeSheet() {
    if (this.timeSheetToDelete !== null) {
      this.feuilleTempsService.deleteFeuilleTemps(this.timeSheetToDelete).subscribe(() => {
        this.timeSheets = this.timeSheets.filter(timeSheet => timeSheet.id !== this.timeSheetToDelete); // Update the list of time sheets
        this.closeModal(); // Close the modal after deletion
      });
    }
  }

  // Open the modal and store the ID of the time sheet to delete
  openDeleteModal(timeSheetId: number) {
    this.timeSheetToDelete = timeSheetId;
    const modal = document.getElementById("popup-modal");
    if (modal) {
      modal.classList.remove("hidden");
    }
  }

  // Close the modal without deletion
  closeModal() {
    this.timeSheetToDelete = null;
    const modal = document.getElementById("popup-modal");
    if (modal) {
      modal.classList.add("hidden");
      this.loadTimeSheets();
    }
  }
}
