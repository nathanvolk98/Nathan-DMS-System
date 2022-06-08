import { HttpClient,  HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import {catchError,tap} from 'rxjs/operators';
import { httpErrorFile } from "../httpErrorFile";
import { loginViewModel } from "./loginViewModel";
          

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private vehicleUrl = 'http://localhost:12345/api/account/auth';
    private httpOptions = {
      headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
     }),
     /* observe: 'body'as const*/
  };

    private loginviewModel!:loginViewModel;

    constructor(private router: Router,private http: HttpClient, private err:httpErrorFile ){}

    login(loginForm:loginViewModel) : Observable<loginViewModel>
    {
        return this.http.post<loginViewModel>(`${this.vehicleUrl}/login`,loginForm,this.httpOptions)
        .pipe(
          tap(data => console.log('login: ' + JSON.stringify(data))),
          catchError(this.err.handleError)
        );
    }

    register(loginForm:loginViewModel) : Observable<loginViewModel> {
      return this.http.post<loginViewModel>(`${this.vehicleUrl}/register`,loginForm,this.httpOptions)
      .pipe(
          tap(data => console.log('Registered: ' + JSON.stringify(data))),
          catchError(this.err.handleError)
        );
    }

}