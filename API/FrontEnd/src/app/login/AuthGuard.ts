import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router) {
  }
  dealerid!:number;
  
  canActivate() {
    const token = localStorage.getItem("jwt");
        if(token &&!this.jwtHelper.isTokenExpired(token))
        {
          var decodeToken= this.jwtHelper.decodeToken(token)
          this.dealerid = decodeToken.dealerid;
          console.log(this.dealerid);
          return true;
        }
    this.router.navigate(["login"]);
    return false;
  }

  getdealerid()
  {
    const token = localStorage.getItem("jwt");
        if(token &&!this.jwtHelper.isTokenExpired(token))
        {
          var decodeToken= this.jwtHelper.decodeToken(token)
          return decodeToken.dealerid;
          
        }
  }
}