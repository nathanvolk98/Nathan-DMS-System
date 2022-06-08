import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { ErrorHandler, Injectable } from "@angular/core";
import { Operation } from "fast-json-patch";
import { NotFoundError, Observable, throwError } from "rxjs";
import {catchError,map,tap} from 'rxjs/operators';
import { httpErrorFile } from "../httpErrorFile";
import { addInventory } from "./addInventory";
import { iInventory } from "./AllInventory/iInventory";
import { IallPublishInventory } from "./IallPublishedInventory";
import { ISpecification } from "./ispecification";
import { vehicleForUpdate } from "./vehicleForUpdate";


@Injectable({
    providedIn: 'root'
})
export class InventoryService {
    private vehicleUrl = 'http://localhost:12345/api/vehicle';
    private httpOptions = {
      headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
     }),
     /* observe: 'body'as const*/
  };
    invetory:iInventory[] = [];

    constructor(private http: HttpClient, private err:httpErrorFile ){}

    getAllInventoryByDealer(dealer_id:number): Observable<iInventory[]>{
      return this.http.get<iInventory[]>(`${this.vehicleUrl}/dealerid/${dealer_id}`,this.httpOptions).
      pipe(map((inventory:iInventory[]) => {
        return inventory;
      }),
      catchError(this.err.handleError)
      );
    }

     publishVehicle(vehicle_id:number, iInventory:iInventory): Observable<iInventory[]>{
    return this.http.put<iInventory[]>(`${this.vehicleUrl}/publishvehicle/${vehicle_id}`,iInventory,{
       headers: { 'Content-Type': 'application/json-patch+json' }}).
       pipe(map((inventory:iInventory[]) => {
        return inventory;
      }),
      catchError(this.err.handleError)
      );
    }
    editVehicle(vehicle: vehicleForUpdate): Observable<vehicleForUpdate> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = `${this.vehicleUrl}/editvehicle/${vehicle.vehicleid}`;
      return this.http.put<vehicleForUpdate>(url, vehicle, { headers })
      .pipe(
        tap(() => console.log('updateVehicle: ' + vehicle.vehicleid)),
        // Return the product on an update
        map(() => vehicle),
        catchError(this.err.handleError)
      );
    }
    getVehicleId(vehicle_id:number): Observable<vehicleForUpdate>{
      // if (vehicle_id === 0) {
      //   return NotFoundError();
      return this.http.get<vehicleForUpdate>(`${this.vehicleUrl}/getvehiclebyid/${vehicle_id}`,this.httpOptions).
      pipe(
        tap(data => console.log('getVehicle: ' + JSON.stringify(data))),
        catchError(this.err.handleError)
      );
    }

    addVehicle(dealerid:number, vehicleForm:addInventory): Observable<addInventory>{
        return this.http.post<addInventory>(`${this.vehicleUrl}/addvehicle/${dealerid}`,vehicleForm,this.httpOptions).
      pipe(
        tap(data => console.log('addVehicle ' + JSON.stringify(data))),
        catchError(this.err.handleError)
      );
    }

    allVehicles(): Observable<IallPublishInventory[]> {
      return this.http.get<IallPublishInventory[]>(`${this.vehicleUrl}/getallvehicles`,this.httpOptions).
      pipe(
        catchError(this.err.handleError)
      );
    }
      
    sendVehicleDetails()
    {
      
    }

  }