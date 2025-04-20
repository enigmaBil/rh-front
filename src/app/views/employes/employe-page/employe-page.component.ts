import { Component } from '@angular/core';
import { PaginationComponent } from "../../../components/pagination/pagination.component";
import { User } from '../../../core/models/user';
import { EmployeService } from '../../../core/services/employé/employe.service';
import { Router, RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-employe-page',
  imports: [PaginationComponent, BreadcrumbComponent, RouterLink],
  templateUrl: './employe-page.component.html',
  styleUrl: './employe-page.component.css'
})
export class EmployePageComponent {
  users: User[] = []; 
  filteredUsers: User[] = []; 
  currentPage: number = 1; 
  itemsPerPage: number = 10; 
  employeToDelete: number | null = null; 
  searchQuery: string = ''; 

  constructor(private employeService: EmployeService, private router: Router ){
    this.loadUsers();

  }

  loadUsers() {
    this.employeService.getAllEmployes().subscribe((data: User[]) => {
      console.log(data);
      this.users = data;
      this.filteredUsers = data; // Initialize filteredUsers with all users
    });
  }

  get paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  filterUsers() {
    if (this.searchQuery) {
      this.filteredUsers = this.users.filter(user => 
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredUsers = this.users; // Reset to all users if search query is empty
    }
  }

  deleteEmploye() {
    if (this.employeToDelete !== null) {
      this.employeService.deleteEmploye(this.employeToDelete).subscribe(() => {
        this.users = this.users.filter(user => user.id !== this.employeToDelete); // Met à jour la liste des utilisateurs
        this.closeModal(); // Ferme le modal après la suppression
      });
    }
  }

  // Ouvre le modal et stocke l'ID du site à supprimer
  openDeleteModal(userId: number) {
    this.employeToDelete = userId;
    const modal = document.getElementById("popup-modal");
    if (modal) {
      modal.classList.remove("hidden");
    }
  }

  // Ferme le modal sans supprimer
  closeModal() {
    this.employeToDelete = null;
    const modal = document.getElementById("popup-modal");
    if (modal) {
      modal.classList.add("hidden");
      this.loadUsers();
    }
  }
}
