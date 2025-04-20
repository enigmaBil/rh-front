import { Injectable } from '@angular/core';
import { BASE_URL } from '../base.url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  url: string = BASE_URL;
  private EMPLOYE_URL: string = `${BASE_URL}/users`;

  constructor(private httpClient: HttpClient) { }

  getAllEmployes(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.EMPLOYE_URL);
  }

  getEmployeById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.EMPLOYE_URL}/${id}`);
  }

  createEmploye(employe: User): Observable<User> {
    return this.httpClient.post<User>(this.EMPLOYE_URL, employe);
  }

  updateEmploye(id: number, employe: User): Observable<User> {
    return this.httpClient.patch<User>(`${this.EMPLOYE_URL}/${id}`, employe);
  }

  deleteEmploye(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.EMPLOYE_URL}/${id}`);
  }


}
