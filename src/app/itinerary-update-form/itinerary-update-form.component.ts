import { Component } from '@angular/core';
import { Itinerary } from '../itinerary';
import { ItineraryComponent } from '../itinerary/itinerary.component';

@Component({
  selector: 'app-itinerary-update-form',
  templateUrl: './itinerary-update-form.component.html',
  styleUrls: ['./itinerary-update-form.component.css']
})
export class ItineraryUpdateFormComponent {
  itinerary: Itinerary[] = []
}
