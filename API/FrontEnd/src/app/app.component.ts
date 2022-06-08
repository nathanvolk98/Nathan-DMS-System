import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { AuthGuard } from './login/AuthGuard';
import { LoginComponent } from './login/login.component';
import { loginViewModel } from './login/loginViewModel';
import { NumberValidators } from './Shared/number.validator';



@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loggedIn: boolean = false;
  sub!: Subscription;
  dealerid!:number;
  
  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router:Router,
    private login:LoginComponent,
    private auth:AuthGuard){
      if(!this.jwtHelper.isTokenExpired())
      {
        this.loggedIn = true;
      }}

    ngOnInit(): void
    {
      const token = localStorage.getItem("jwt");
        if(token &&!this.jwtHelper.isTokenExpired(token))
        {
          this.loggedIn =  true;
        }

        this.dealerid = this.auth.getdealerid();

        console.log(this.dealerid);
    }

    logout(){
      this.loggedIn = false;
        localStorage.removeItem("jwt");
        this.router.navigate(["/cars"])
     }
     ngDestroy(){

     }
}
