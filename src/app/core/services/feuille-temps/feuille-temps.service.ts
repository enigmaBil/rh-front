import { Injectable } from "@angular/core";
import { BASE_URL } from "../base.url";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TimeSheet } from "../../models/timesheet";

@Injectable({
  providedIn: 'root'
})
export class FeuilleTempsService {
    url: string = BASE_URL;
    private FEUILLE_TEMPS_URL: string = `${BASE_URL}/timesheets`;

    constructor(private readonly httpClient: HttpClient) { }

    getAllFeuilleTemps(): Observable<TimeSheet[]> {
        return this.httpClient.get<TimeSheet[]>(this.FEUILLE_TEMPS_URL);
    }
    getFeuilleTempsById(id: number): Observable<TimeSheet> {
        return this.httpClient.get<TimeSheet>(`${this.FEUILLE_TEMPS_URL}/${id}`);
    }

    createFeuilleTemps(feuilleTemps: TimeSheet): Observable<TimeSheet> {
        return this.httpClient.post<TimeSheet>(this.FEUILLE_TEMPS_URL, feuilleTemps);
    }

    updateFeuilleTemps(id: number, feuilleTemps: TimeSheet): Observable<TimeSheet> {
        return this.httpClient.patch<TimeSheet>(`${this.FEUILLE_TEMPS_URL}/${id}`, feuilleTemps);
    }

    validateFeuilleTemps(id: number, status: string, comment: string): Observable<TimeSheet> {
        return this.httpClient.patch<TimeSheet>(`${this.FEUILLE_TEMPS_URL}/${id}/validate`, {status, comment});
    }

    deleteFeuilleTemps(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.FEUILLE_TEMPS_URL}/${id}`);
    }
}