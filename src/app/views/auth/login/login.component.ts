import { Component } from '@angular/core';
import {NgStyle} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../../core/services/auth/auth.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    NgStyle,
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onLogin() {
    console.log('Données envoyées:', { email: this.email, password: this.password });
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
        console.log(error);
      }
    });
  }
}
