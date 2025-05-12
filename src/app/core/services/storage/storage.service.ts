import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly USER_KEY = 'user';
  private readonly TOKEN_KEY = 'auth-token';

  // 🔐 Récupère les infos de l'utilisateur connecté depuis le localStorage
  getUser(): any {
    const user = localStorage.getItem(this.USER_KEY);
    try {
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }

  // 💾 Sauvegarde les infos de l'utilisateur dans le localStorage
  saveUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  // 🔐 Récupère le token JWT depuis le localStorage
  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY) || '';
  }

  // 💾 Sauvegarde le token JWT dans le localStorage
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // ❌ Déconnexion → supprime les infos de l'utilisateur et le token
  clear(): void {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
