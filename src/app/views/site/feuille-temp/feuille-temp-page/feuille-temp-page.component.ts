import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FeuilleTempsService } from '../../../../core/services/feuille-temps/feuille-temps.service';
import { FlowbiteService } from '../../../../core/services/flowbite/flowbite.service';
import { Accordion, AccordionItem, AccordionOptions } from 'flowbite';
import { TimeSheet } from '../../../../core/models/timesheet';
import { DatePipe, NgClass } from '@angular/common';
import { PaginationComponent } from "../../../../components/pagination/pagination.component";

@Component({
  selector: 'app-feuille-temp-page',
  imports: [RouterLink, DatePipe, NgClass, PaginationComponent],
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

 constructor(
     @Inject(PLATFORM_ID) private platformId: any,
     private flowbite: FlowbiteService
   ) {  }

  ngOnInit(): void {
    this.loadTimeSheets();
    
    const accordionEl = document.querySelector('#accordion-open');

    const accordionItems: AccordionItem[] = [
      {
        id: 'accordion-open-heading-1',
        triggerEl: document.querySelector('#accordion-open-heading-1') as HTMLElement,
        targetEl: document.querySelector('#accordion-open-body-1') as HTMLElement,
        active: false
      }
    ];

    const options: AccordionOptions = {
      alwaysOpen: false,
      activeClasses: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
      inactiveClasses: 'text-gray-500 dark:text-gray-400'
    };

    if (accordionEl) {
      new Accordion(accordionEl as HTMLElement, accordionItems, options);
    }
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
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredTimeSheets.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  filterTimeSheets() {
    if (this.searchQuery) {
      this.filteredTimeSheets = this.timeSheets.filter(timeSheet => 
        timeSheet.status.includes(this.searchQuery) 
      );
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
