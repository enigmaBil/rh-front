import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  // Simulation de connexion (à remplacer par un appel API)
  login(email: string, password: string): boolean {
    if (email === 'admin@tek-rh.com' && password === 'password') {
      const fakeToken = 'admin-fake-jwt-token';
      const role = 'ADMIN'; // Simulation du rôle (remplacé par la réponse du backend plus tard)
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('role', role);
      return true;
    } else if (email === 'rh@tek-rh.com' && password === 'password') {
      localStorage.setItem('token', 'rh-fake-jwt-token');
      localStorage.setItem('role', 'RH');
      return true;
    } else if (email === 'employe@tek-rh.com' && password === 'password') {
      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem('role', 'EMPLOYE');
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
}
