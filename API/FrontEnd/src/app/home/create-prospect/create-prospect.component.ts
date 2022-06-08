import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { IallPublishInventory } from 'src/app/Inventory/IallPublishedInventory';
import { InventoryService } from 'src/app/Inventory/inventory.service';
import { vehicleForUpdate } from 'src/app/Inventory/vehicleForUpdate';
import { icreateProspect } from 'src/app/Prospects/icreate-prospect';
import { ProspectService } from 'src/app/Prospects/prospect.service';
import { WelcomeComponent } from '../welcome.component';

@Component({
  selector: 'app-create-prospect',
  templateUrl: './create-prospect.component.html',
  styleUrls: ['./create-prospect.component.css']
})
export class CreateProspectComponent implements OnInit {


  prospect = new icreateProspect(); 
  prospectForm!:FormGroup;
  private sub!: Subscription;
  vehicleid!:number; 
  dealerid!: number;
  vehicle!: vehicleForUpdate;

  constructor(
    private prospectservice:ProspectService,
    private fb:FormBuilder,
    private inventoryService: InventoryService,
    private router: Router,
    private welcomeComponent: WelcomeComponent
    
  ) { }

  ngOnInit(): void {

    let object= history.state;
    this.vehicleid= object.vehicleid;
    this.dealerid = object.dealerid;

    console.log(this.vehicleid);
    this.prospectForm = this.fb.group({

      customer_fullname: ['', [
        Validators.required,
        Validators.minLength(2)]],

      customer_email: ['', [
        Validators.required,
        Validators.minLength(2)]],

      customer_number: ['', [
          Validators.required,
          Validators.minLength(2)]]
    });

    
    if(this.sub)
    {
      
    }
  }
  addProspect()
{
  let prospect = this.prospectForm.value;
    this.sub = this.prospectservice.createEnquiry(this.dealerid,this.vehicleid,prospect)
    .subscribe({
      next: () => this.onSaveComplete()
    });
  }
  onBack():void {
  this.router.navigateByUrl('/cars');
 }
  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.prospectForm.reset();
    this.router.navigate(['/cars']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
