import { Component, Input } from '@angular/core';

import {City} from '../city';
import {CityService} from '../city.service';
import { CityModel } from '../city.model';
import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})
export class CityFormComponent {
  @Input() city?: CityModel;
  constructor(private cityService: CityService, private http: HttpClient) { }


   submitted = false;
   //model = new CityModel("Paris", 2160000, "France", 800)
   //model = new CityModel("London", 300000, "UK", 1800);
    model = new CityModel('',0,'','',0,0);

    error = false;
    //private errorSub: Subscription;


   onSubmit() {
    this.submitted = true;
    alert("Submitted");
    this.error = false;

    this.cityService.createCity(this.model).catch(error=> {
      this.error = true;

    });
 
   
    
   }





}
