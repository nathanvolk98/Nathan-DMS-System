import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class vehicleForUpdate {
    vehicleid!: number;
    dealerid!: number;
    make!: string;
    model!: string;
    model_built_year!: number;
    body_type!:string
    odometer!: number;
    registration_number!:string;
    doors!:string;
    transmission!:string;
    fuel!:string;
    seats!:string;
    dap_price!:number;
    egc_price!: number;
}