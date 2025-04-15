import { Component } from '@angular/core';
import {AsyncPipe, NgIf, NgStyle} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../../core/services/auth/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    NgStyle,
    RouterLink,
    FormsModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private authService: AuthService) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }
    console.log('Données envoyées:', { email: this.email, password: this.password });
    this.loading$.next(true); 
    this.authService.login(this.email, this.password).subscribe({
      next: (data ) => {
        console.log(data.user);
        if (data.user.role === 'ADMIN' || data.user.role === 'RH') {
        this.router.navigate(['/admin/dashboard']);
        }else {
          this.router.navigate(['/portal/home.face']);
        }
      },
      error: (error:HttpErrorResponse) => {
        if (error.status === 401) {
          this.errorMessage = 'Identifiants invalides.';
        }
        if (error.status === 403) {
          this.errorMessage = 'Accès refusé. Vous n\'avez pas les autorisations nécessaires.';
        }
        if (error.status === 404) {
          this.errorMessage = "Adresse e-mail ou mot de passe incorrect.";
        }
      },
      complete: () => {
        this.loading$.next(false); 
      }
    });
  }
}
