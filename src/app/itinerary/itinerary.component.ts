import { Component } from '@angular/core';
import { ItineraryService } from '../itinerary.service';
import { Itinerary } from '../itinerary';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css']
})
export class ItineraryComponent {
  constructor(public ItineraryService: ItineraryService) {}

  itinerary: Itinerary[] = []

  ngOnInit(): void {
    this.getItinerary();
  }

  getItinerary(): void{
    this.ItineraryService.fetchItinerary().subscribe(itinerary=>this.itinerary = itinerary);
  }

  deleteItinerary(): void{
    this.ItineraryService.deleteItinerary().subscribe(() => {
      this.itinerary = [];
    })
  }
}
