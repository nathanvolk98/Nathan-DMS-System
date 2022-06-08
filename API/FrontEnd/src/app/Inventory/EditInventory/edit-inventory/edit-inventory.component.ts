import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { iInventory } from '../../AllInventory/iInventory';
import { vehicleForUpdate } from '../../vehicleForUpdate';
import { FormGroup, FormControl, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../inventory.service';
import { GenericValidator } from 'src/app/Shared/generic-validator';
import { NumberValidators } from 'src/app/Shared/number.validator';
import { debounceTime, fromEvent, merge, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.css']
})
export class EditInventoryComponent implements OnInit, OnDestroy {
  
  vehicleid!: number;
  vehicleForm!: FormGroup;
  vehicle!: vehicleForUpdate;
  errorMessage!: string;
  private genericValidator!: GenericValidator;
  private sub!: Subscription;


  inventory = new vehicleForUpdate(); 

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
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

    let id = this.route.snapshot.paramMap.get('vehicleid') as string;
    var newid = this.ConvertStringToNumber(id);
    this.getVehicleById(newid);

    this.sub = this.route.paramMap.subscribe(
      params => {
      let id = this.route.snapshot.paramMap.get('vehicleid') as string;
      var newid = this.ConvertStringToNumber(id);
      this.getVehicleById(newid);
      }
    ); 
  
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
    this.vehicleForm.reset();
    this.router.navigate(['/inventory']);
  }

  displayVehicle(vehicle: vehicleForUpdate): void {
    if (this.vehicleForm) {
      this.vehicleForm.reset();
    }
    this.vehicle = vehicle;

    // Update the data on the form
    this.vehicleForm.patchValue({
      make: this.vehicle.make,
      model: this.vehicle.model,
      model_built_year: this.vehicle.model_built_year,
      body_type: this.vehicle.body_type,
      odometer: this.vehicle.odometer,
      registration_number:this.vehicle.registration_number,
      doors: this.vehicle.doors,
      transmission:this.vehicle.transmission,
      fuel:this.vehicle.fuel,
      seats:this.vehicle.seats,
      dap_price:this.vehicle.dap_price,
      egc_price: this.vehicle.egc_price,
    });
  }

  getVehicleById(vehicle_id :number ): void{
    this.inventoryService.getVehicleId(vehicle_id)
      .subscribe({
        next: (vehicle: vehicleForUpdate) => this.displayVehicle(vehicle),
        error: err => this.errorMessage = err
      });
    
  }

  editVehicle(): void {
    if (this.vehicleForm.valid && this.vehicleForm.dirty)
     {
        const v = { ...this.vehicle, ...this.vehicleForm.value };

          this.inventoryService.editVehicle(v)
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