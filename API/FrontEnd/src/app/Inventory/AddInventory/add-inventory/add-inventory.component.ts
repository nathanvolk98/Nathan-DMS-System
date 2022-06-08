import { Component, OnDestroy, OnInit, } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../inventory.service';
import { GenericValidator } from 'src/app/Shared/generic-validator';
import { NumberValidators } from 'src/app/Shared/number.validator';
import { Subscription } from 'rxjs';
import { addInventory } from '../../addInventory';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {
    
    vehicleid!: number;
    vehicleForm!: FormGroup;
    vehicle!: addInventory;
    errorMessage!: string;
    private genericValidator!: GenericValidator;
    private sub!: Subscription;
  
  
    inventory = new addInventory(); 
  
    constructor(private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private jwtHelper: JwtHelperService,
      private inventoryService: InventoryService,
      private numberValidator: NumberValidators) {}
        
    ngOnInit() {
      
      this.vehicleForm = this.fb.group({
  
        make: ['', [
          Validators.required,
          Validators.minLength(2)]],
  
        model: ['', [
          Validators.required,
          Validators.minLength(2)]],
  
        model_built_year:['', [Validators.required,
        NumberValidators.range(1910, 2022)]],
  
        body_type: ['', [Validators.required]],
        odometer: ['', [Validators.required]],
        registration_number: ['', [Validators.required]],
        doors: ['', [Validators.required]],
        transmission: ['', [Validators.required]],
        fuel: ['', [Validators.required]],
        seats: ['', [Validators.required]],
        dap_price: '',
        egc_price: ['', [Validators.required]],
      });
      if(this.sub)
      {
    }
  }

    ConvertStringToNumber(input: string) {
      var numeric = Number(input);
      return numeric;
  }
     onBack():void {
      this.router.navigateByUrl('/inventory');
     }
    onSaveComplete(): void {


      // Reset the form to clear the flags
      this.router.navigateByUrl('/inventory');
      
    }
  
    addVehicle(): void 
    {
      if (this.vehicleForm.valid && this.vehicleForm.dirty)
      {
        const token = localStorage.getItem("jwt");
        if (token)
        {
      var decodeToken= this.jwtHelper.decodeToken(token)
      var getDealerId = decodeToken.dealerid;
      console.log(getDealerId);
        }
        let vehicle = this.vehicleForm.value;
        this.sub = this.inventoryService.addVehicle(getDealerId,vehicle)
             .subscribe({
               next: () => this.onSaveComplete(),
               error: err => this.errorMessage = err
             });
         }  
     else {
       console.log(`Please correct the validation errors ${this.vehicleForm.valid}`);
     }
   }

    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }
  }