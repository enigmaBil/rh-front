import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userName!: string;
  userEmail!: string;
  constructor(private readonly authService: AuthService, private flowbite: FlowbiteService) { }


  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') || '';
    this.userEmail = localStorage.getItem('userEmail') || '';

    this.flowbite.loadFlowbite(fb => {
      fb.initDropdowns()
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        // Redirection vers la page de connexion après la déconnexion
        window.location.href = '/auth/login';
      }
    });
  }
}
