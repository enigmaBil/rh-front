import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'http://localhost:3000/api/v1/users';

  constructor(private http: HttpClient) {}

  /**
   * Récupère l'ID de l'utilisateur connecté depuis le localStorage.
   * Vérifie strictement que l'utilisateur est EMPLOYE.
   * Retourne 0 si aucun utilisateur valide ou rôle incorrect.
   */
  getEmployeeId(): number {
    try {
      const userRaw = localStorage.getItem('user');
      console.log('[UserService] Contenu brut localStorage :', userRaw);

      const user = JSON.parse(userRaw || '{}');

      if (user && user.id && user.role === 'EMPLOYE') {
        console.log('[UserService] Utilisateur EMPLOYE détecté :', user);
        return user.id;
      } else {
        console.warn('[UserService] Aucun utilisateur EMPLOYE connecté ou ID manquant. Vérifiez le rôle et l\'ID.');
        return 0;
      }
    } catch (error) {
      console.error('[UserService] Erreur lors du parsing de l\'utilisateur dans localStorage :', error);
      return 0;
    }
  }

  /**
   * Récupère tous les utilisateurs avec le rôle EMPLOYE.
   */
  getAllEmployes(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL).pipe(
      map(users => users.filter(user => user.role === 'EMPLOYE'))
    );
  }
}
