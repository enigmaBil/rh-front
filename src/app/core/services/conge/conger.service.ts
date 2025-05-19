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

  getAllCongers(): Observable<Conger[]> {
    return this.http.get<Conger[]>(this.CONGE_URL);
  }

  addConger(conger: Conger): Observable<Conger> {
    return this.http.post<Conger>(this.CONGE_URL, conger); 
  }

  updateStatut(id: number, statut: StatutConger): Observable<Conger> {
    return this.http.put<Conger>(`${this.CONGE_URL}/updateStatut/${id}`, { statut });
  }

  getCongersByUserId(userId: number): Observable<Conger[]> {
    return this.http.get<Conger[]>(`${this.CONGE_URL}/user/${userId}`);
  }

  deleteConger(id: number): Observable<void> {
    return this.http.delete<void>(`${this.CONGE_URL}/${id}`);
  }
}
