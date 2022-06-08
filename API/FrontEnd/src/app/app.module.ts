
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from "@auth0/angular-jwt";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AllInventoryComponent } from './Inventory/AllInventory/all-inventory.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { AddInventoryComponent } from './Inventory/AddInventory/add-inventory/add-inventory.component';
import { EditInventoryComponent } from './Inventory/EditInventory/edit-inventory/edit-inventory.component';
import { AllProspectsComponent } from './Prospects/AllProspects/all-prospects/all-prospects.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorsRequestInterceptor } from './Inventory/CorsRequestInterceptor';
import { NumberValidators } from './Shared/number.validator';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/AuthGuard';
import { CreateProspectComponent } from './home/create-prospect/create-prospect.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    AllInventoryComponent,
    AddInventoryComponent,
    EditInventoryComponent,
    AllProspectsComponent,
    WelcomeComponent,
    LoginComponent,
    CreateProspectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'inventory', component : AllInventoryComponent, canActivate: [AuthGuard]},
      {path: '*', component : WelcomeComponent},
      {path: 'cars', component: WelcomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'enquiry', component: CreateProspectComponent},
      {path: 'inventory/addinventory', component: AddInventoryComponent, canActivate: [AuthGuard]},
      {path: 'inventory/editinventory/:vehicleid', component: EditInventoryComponent, canActivate: [AuthGuard]},
      {path: 'prospects', component: AllProspectsComponent, canActivate: [AuthGuard]}
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        allowedDomains: ['localhost:12345'],
        disallowedRoutes: ['localhost:12345/api/auth']
      }
    })
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: CorsRequestInterceptor,
    multi: true,
  },
  NumberValidators,
  AuthGuard,
  LoginComponent,
  WelcomeComponent
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
