import { NgClass } from '@angular/common';
import { Component, computed, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 5;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  // Calculer le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  pages = computed(() => Array.from({ length: this.totalPages }, (_, i) => i + 1));

  // get pages(): number[] {
  //   return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  // }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }

  gotoPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }

  getFirstItemIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }
  
  getLastItemIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }
}
