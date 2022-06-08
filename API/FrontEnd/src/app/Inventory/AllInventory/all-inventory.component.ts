import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { compare, Operation } from 'fast-json-patch';
import { map, pipe } from 'rxjs';
import { InventoryService } from '../inventory.service';
import { ISpecification } from '../ispecification';
import { vehicleForUpdate } from '../vehicleForUpdate';
import { iInventory } from './iInventory';

@Component({
  templateUrl: './all-inventory.component.html',
  styleUrls: ['./all-inventory.component.css']
})
export class AllInventoryComponent implements OnInit {

  specificiation:ISpecification[] = [];
  inventory:iInventory[] = [];
  public vehicleForm!: FormGroup;
  private vehicleid!:number;
   originalVehicleForUpdate! : iInventory;
  private vehicleForUpdate!:vehicleForUpdate;
  dealerid!: number;
  decodeToken!:any;
  jwtDat:any | null;
  

  // originalPublishEvent: iInventory = {
  //     published: false
  // }

  // publishVehicleForm:iInventory{...this.originalPublishEvent};

  constructor(private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    const token = localStorage.getItem("jwt");
    if (token)
    {
      var decodeToken= this.jwtHelper.decodeToken(token)
      var getDealerId = decodeToken.dealerid;
      console.log(getDealerId);
      this.getVehiclesByDealer(getDealerId);
    }     
   }
      
      getVehiclesByDealer(dealer_id:number)
      {            
        this.inventoryService.getAllInventoryByDealer(dealer_id).subscribe(
          (data)=>this.inventory = data);
        
      }
      ConvertStringToNumber(input: string | null) {
        var numeric = Number(input);
        return numeric;
    }
      onBack():void {
      this.router.navigateByUrl('/inventory');
     }

      publishEvent2(vehicleid:number, publish:iInventory) {

        this.inventoryService.publishVehicle(vehicleid, publish)
        .subscribe({
          next:() => {
            this.router.navigateByUrl('/inventory');
        }});
        
        };


      dateCalculation(sentDate:any)
      {
        var date1:any = new Date(sentDate)
        var date2:any  = new Date();

        var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

        return diffDays;
      }



  }
