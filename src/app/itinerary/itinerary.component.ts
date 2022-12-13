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
  editTrip: Itinerary | undefined;
  tripDate = "";

  ngOnInit(): void {
    this.getItinerary();
  }


  getItinerary(): void{
    this.ItineraryService.fetchItinerary().subscribe(itinerary=>this.itinerary = itinerary);
  }

  deleteItinerary(): void{
    //this.ItineraryService.deleteItinerary().subscribe(() => {
    //  this.itinerary = [];
    //})
  }

  deleteItinerary2(): void{
    this.ItineraryService.deleteItinerary2().subscribe(() => {
      this.itinerary = [];
    })
  }

  getLastId() {
   const aaa = this.ItineraryService.getLastId();

   console.log(aaa);
  }


}
