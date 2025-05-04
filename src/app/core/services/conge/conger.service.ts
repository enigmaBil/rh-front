import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conger, StatutConger } from '../../models/conge.model';
import { BASE_URL } from '../base.url'; 

@Injectable({
  providedIn: 'root'
})
export class CongerService {
  private CONGE_URL: string = `${BASE_URL}/conger`; 
  constructor(private http: HttpClient) {}

  // Get all congés
  getAllCongers(): Observable<Conger[]> {
    return this.http.get<Conger[]>(this.CONGE_URL);
  }

  // Add a new congé
  addConger(conger: Conger): Observable<Conger> {
    return this.http.post<Conger>(this.CONGE_URL, conger); 
  }

  // Update statut of a congé
  updateStatut(id: number, statut: StatutConger): Observable<Conger> {
    return this.http.patch<Conger>(`${this.CONGE_URL}/${id}`, { statut }); 
  }
}
