import { Component, OnInit, Input } from '@angular/core';
import { City } from '../city';
import { CityModel } from '../city.model';
import { Itinerary } from '../itinerary';
import { CityService } from '../city.service';
import { ItineraryService } from '../itinerary.service';
import { MessageService } from '../message.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.css']
})
export class CityDetailsComponent {
  @Input() city?: CityModel;

  constructor(private cityService: CityService, private itineraryService: ItineraryService, private messageService: MessageService, private route: ActivatedRoute,
    private location: Location,) {

  }


  itinerary = Itinerary

  date = "";
  cost = 0;

  submitted = false;
  model = new Itinerary('city name', 'test date', 0);

  opendetails = false;



  selectedCity?: CityModel;
  onSelect(city: CityModel): void {
    this.selectedCity = city;

    this.submitted = true;
    this.model.city = city.name;
    this.model.date = this.date;
    this.model.cost = this.cost;
    this.itineraryService.createItinerary(this.model);
    alert("succeed!");

  }

  ngOnInit(): void {
    this.getCity();
    this.opendetails = true;
  }

  getCity(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cityService.getCity(id)
  }

  closedetails(): void {

  }
}
