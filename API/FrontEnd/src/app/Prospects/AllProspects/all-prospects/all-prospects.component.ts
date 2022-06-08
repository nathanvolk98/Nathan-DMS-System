import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { iProspect } from '../../iProspect';
import { ProspectService } from '../../prospect.service';

@Component({
  selector: 'app-all-prospects',
  templateUrl: './all-prospects.component.html',
  styleUrls: ['./all-prospects.component.css']
})
export class AllProspectsComponent implements OnInit {

  prospects:iProspect[]= []

  constructor(private ProspectService:ProspectService,
    private jwtHelper:JwtHelperService) { }

  ngOnInit(): void {
    const token = localStorage.getItem("jwt");
    if (token)
    {
      var decodeToken= this.jwtHelper.decodeToken(token)
      var getDealerId = decodeToken.dealerid;
      console.log(getDealerId);
      this.displayDealersProspects(getDealerId);
    }     

  }

  displayDealersProspects(dealer_id:number) 
  {
    return this.ProspectService.displayDealersProspects(dealer_id).subscribe((data) =>
    {
      this.prospects = data;
      console.log(data);
    });
  }
}
