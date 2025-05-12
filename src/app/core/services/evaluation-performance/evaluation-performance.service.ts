import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evaluation } from '../../models/evaluation/model';
import { BASE_URL } from '../base.url';

@Injectable({
  providedIn: 'root'
})
export class EvaluationPerformanceService {
  private readonly EVALUATION_URL = `${BASE_URL}/evaluations`;

  constructor(private http: HttpClient) {}

  /**
   * 📋 Récupérer toutes les évaluations
   */
  getAll(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(this.EVALUATION_URL);
  }

  /**
   * 🔍 Récupérer une évaluation par son ID
   */
  getById(id: number): Observable<Evaluation> {
    return this.http.get<Evaluation>(`${this.EVALUATION_URL}/${id}`);
  }

  /**
   * 🔍 Récupérer toutes les évaluations associées à un employé donné
   */
  getEvaluationsByEmployeeId(employeeId: number): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`${this.EVALUATION_URL}/employee/${employeeId}`);
  }

  /**
   * ➕ Créer une nouvelle évaluation
   */
  create(evaluation: Evaluation): Observable<Evaluation> {
    return this.http.post<Evaluation>(this.EVALUATION_URL, evaluation);
  }

  /**
   * ✏️ Mettre à jour une évaluation existante
   */
  update(id: number, evaluation: Evaluation): Observable<Evaluation> {
    return this.http.patch<Evaluation>(`${this.EVALUATION_URL}/${id}`, evaluation);
  }

  /**
   * 🗑️ Supprimer une évaluation
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.EVALUATION_URL}/${id}`);
  }
}
