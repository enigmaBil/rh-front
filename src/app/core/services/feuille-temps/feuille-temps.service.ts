import { Injectable } from "@angular/core";
import { BASE_URL } from "../base.url";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeuilleTempsService {
    url: string = BASE_URL;
    private FEUILLE_TEMPS_URL: string = `${BASE_URL}/timesheets`;

    constructor(private readonly httpClient: HttpClient) { }

    getAllFeuilleTemps(): Observable<any[]> {
        const f = this.httpClient.get<any[]>(this.FEUILLE_TEMPS_URL);
        f.subscribe((data) => {
            console.log("Feuille de temps:", data);
        });
        return f;
    }
}