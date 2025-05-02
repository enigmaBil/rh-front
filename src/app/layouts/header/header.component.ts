import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userName!: string;
  userEmail!: string;
  userRole!: string;
  constructor(private readonly authService: AuthService, private flowbite: FlowbiteService, private readonly router: Router) { }


  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') || '';
    this.userEmail = localStorage.getItem('userEmail') || '';
    this.userRole = localStorage.getItem('userRole') || '';
    console.log(this.userRole);
    
    this.flowbite.loadFlowbite(fb => {
      fb.initDropdowns()
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        // Redirection vers la page de connexion après la déconnexion
        this.router.navigate(['/auth/login']).then(() => {
          localStorage.removeItem('userName');
          localStorage.removeItem('userEmail');
        });
        //window.location.href = '/auth/login';
      }
    });
  }
}
