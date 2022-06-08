import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';;
import { Subscription } from 'rxjs/internal/Subscription';
import { IallPublishInventory } from '../Inventory/IallPublishedInventory';
import { InventoryService } from '../Inventory/inventory.service';
import { GenericValidator } from '../Shared/generic-validator';
import { NumberValidators } from '../Shared/number.validator';


@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']

})
export class WelcomeComponent implements OnInit{

  value:number = 5;

  public vehicleid!:number;
  dealerid!: number;
    vehicleForm!: FormGroup;
    vehicle: IallPublishInventory[] = [];
    errorMessage!: string;
    private genericValidator!: GenericValidator;
    private sub!: Subscription;
    public published: {published?:boolean} = {};
    public value2: {vehicleid2?:number,dealerid2?:number} = {};
    
    constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private inventoryService: InventoryService,
    private numberValidator: NumberValidators) {}

    ngOnInit() {
      this.inventoryService.allVehicles().subscribe(
        (data) =>{
          this.vehicle = data
        });

    }

    navigate(vehicleid:any, dealerid:any)
    {
      this.router.navigate(["/enquiry"],{state: {vehicleid:vehicleid,dealerid:dealerid}});
    }
    
  sendvalue()
  {
    return this.value *6;
  }

    
}
