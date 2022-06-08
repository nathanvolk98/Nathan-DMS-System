import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class loginViewModel {
    username!: string;
    password!: string;
    remember_me!: boolean;
}