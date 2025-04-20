import {computed, Injectable, signal} from '@angular/core';
import {BASE_URL} from '../base.url';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url= BASE_URL
  private AUHT_URL= `${BASE_URL}/auth`;
  private _currentUser = signal<User | null>(null)
  currentUser= this._currentUser.asReadonly();
  isConnected = computed(() => this.currentUser() !== null);
  userRole?:string;
  userName?:string;
  userEmail?:string;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) : Observable<{ user:User }> {
      return this.http.post<{user:User}>(`${this.AUHT_URL}/login`, {email, password}, {withCredentials: true})
    .pipe(
      tap(response =>{
        // Les deux tokens sont automatiquement stockés dans des cookies HTTP-only
        // Nous mettons à jour l'état de l'utilisateur connecté
        this.userRole = response.user.role;
        localStorage.setItem('userRole',this.userRole);
        localStorage.setItem("userName", response.user.name);
        localStorage.setItem("userEmail", response.user.email);
        this._currentUser.set(response.user);
      })
    );
  }

  // Méthode pour rafraîchir les tokens. Utilisée par l'intercepteur HTTP
  refreshToken(): Observable<any> {
    return this.http.post(`${this.AUHT_URL}/refreshToken`, {}, { withCredentials: true })
    .pipe(
      tap(response => {
        // Les nouveaux tokens sont automatiquement stockés dans des cookies HTTP-only
        console.log('Tokens renouvellés avec succes!!!');
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.AUHT_URL}/logout`, {}, { withCredentials: true })
    .pipe(
      tap(response => {
        // Le backend devrait supprimer les cookies
        this._currentUser.set(null);
      })
    );
  }

}
