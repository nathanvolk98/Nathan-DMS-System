import { HttpClient,  HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, Subscription, tap } from "rxjs";
import { observableToBeFn } from "rxjs/internal/testing/TestScheduler";
import { httpErrorFile } from "../httpErrorFile";
import { icreateProspect } from "./icreate-prospect";
import { iProspect } from "./iProspect";


@Injectable({
    providedIn: 'root'
})
export class ProspectService {
    private prospectUrl = 'http://localhost:12345/api/prospect';
    private httpOptions = {
      headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
     }),
     /* observe: 'body'as const*/
  };
  prospect:iProspect[] = [];
  newProspect!:icreateProspect;
  value:number = 5;

  constructor(private http: HttpClient, private err:httpErrorFile ){}

  displayDealersProspects(dealer_id:number): Observable<iProspect[]>
  {
    return this.http.get<iProspect[]>(`${this.prospectUrl}/dealersprospects/${dealer_id}`,this.httpOptions);
  }

  createEnquiry(dealer_id:number, vehicle_id:number,newProspect:icreateProspect): Observable<icreateProspect>
  {
    return this.http.post<icreateProspect>(`${this.prospectUrl}/createprospect/${dealer_id}/${vehicle_id}`,newProspect).
     pipe(
      tap(data => console.log('addProduct: ' + JSON.stringify(data))),
      catchError(this.err.handleError)
    );
  }

  sendvalue()
  {
    return this.value *6;
  }

}
