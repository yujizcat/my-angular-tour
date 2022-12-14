import { Component, OnInit } from '@angular/core';
import {City} from '../city';
import {CityService} from '../city.service';
import { CityModel } from '../city.model';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  constructor(private cityService: CityService, private messageService: MessageService) { }

  cities: CityModel[] = []
  open = 0

  ngOnInit(): void {
    this.getCities();
    this.cityService.sub$.subscribe((name:any)=>{
      console.log(`call componets from service ${name}`);
      this.open = 0;
      this.getCities();
    })
  }

  selectedCity?: CityModel;
  onSelect(city: CityModel): void {
    this.open = 1;
    this.selectedCity = city;
  }

  closeButton(): void{
    //this.open=0;
    alert("aaa")
  }

  getCities(): void{
   this.cityService.fetchCities().subscribe(cities=>this.cities = cities);
  }

  deleteCities(): void{
    this.cityService.deleteCities().subscribe(() => {
      this.cities = [];
    })
  }

  deleteOneCity(): void {
    this.cities = this.cities.filter(c => c !== c);
    this.cityService
      .deleteOneCity('a');

  }

  hideCities(): void{
    this.open = 0;
  }

}
