import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { GenericValidator } from '../Shared/generic-validator';
import { LoginService } from './login.service';
import { loginViewModel } from './loginViewModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user!:loginViewModel;
  loginForm!: FormGroup;
  private genericValidator!: GenericValidator;
  errorMessage!: string;
  private sub!: Subscription;
  invalidLogin!: boolean;
  dealersid!:number;
  loginAttemptFailed:boolean = false;
  dealerid: Subject<any> = new BehaviorSubject<any>({});
 


  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private jwtHelper: JwtHelperService,
    private router: Router) { }

    isUserAuthenticated() {
      const token: string | null = localStorage.getItem("jwt");
      if (token && !this.jwtHelper.isTokenExpired(token)) {
        console.log("true");
        return true;
      }
      else {
        return false;
      }
    }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      
      username: ['', [
        Validators.required]],

      password: ['',[
        Validators.required]],
      
      remember_me: ['']
      
    });
  }

    login() :void
    {
    if (this.loginForm.valid && this.loginForm.dirty)
    {
    let loginForms = this.loginForm.value;

     this.loginService.login(loginForms).subscribe(response => {
      const token = (<any>response).token; 
      localStorage.setItem("jwt", token);
      var decodeToken= this.jwtHelper.decodeToken(token)
      var getDealerId = decodeToken.dealerid;
      this.dealersid = getDealerId;
      console.log("login component",this.dealersid);
      this.invalidLogin = false;
      this.router.navigate(["/inventory"]);
      }, 
      (error) => {
      this.invalidLogin = true;
      this.loginForm.reset();
      this.loginAttemptFailed =true;
      });
    }
  }

  getProfile(): BehaviorSubject<any> 
  {
    return this.dealerid as BehaviorSubject<any>;
  }

  logOut() {
    localStorage.removeItem("jwt");
    this.router.navigate(["/cars"])
 }
}