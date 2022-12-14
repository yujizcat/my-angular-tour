import { Component, Input } from '@angular/core';
import { ItineraryService } from '../itinerary.service';
import { Itinerary } from '../itinerary';
import { ItineraryUpdateFormComponent } from '../itinerary-update-form/itinerary-update-form.component';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css']
})
export class ItineraryComponent {
  @Input() itin?: Itinerary;

  constructor(public ItineraryService: ItineraryService) {}
  
  itinerary: Itinerary[] = []
  editTrip: Itinerary | undefined;
  tripDate = "";

  openUpdateForm = false;
  submitted = false;

  model = new Itinerary(0,'','',0);
  


  ngOnInit(): void {
    this.getItinerary();
  }

  clickBack(): void {
    this.openUpdateForm=false;
  }

  selectedItin?: Itinerary;
  onSelect(itin: Itinerary): void {
    this.model = itin;
    this.selectedItin = itin;
    this.setCurrentItinerary(itin);
    if (this.selectedItin){
    this.openUpdateForm = true;
    }
  }


  getItinerary(): void{
    this.ItineraryService.fetchItinerary().subscribe(itinerary=>this.itinerary = itinerary);
  }

  setCurrentItinerary(itin: Itinerary): void{
    console.log('sett');
    this.selectedItin = itin;
  }


  updateItinerary(itinerary: Itinerary): void{
    this.ItineraryService.updateTrip(itinerary);
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
   //this.ItineraryService.getLastId();
   //console.log(this.ItineraryService.getId());
   var a = this.ItineraryService.getLastId();
   console.log(a);
   console.log(this.ItineraryService.getId());
  }

  onSubmit(){
    console.log(this.selectedItin);
    console.log(this.model['city']);
    //this.model= this.selectedItin;
    this.submitted = true;
    alert('updated');
    this.ItineraryService.updateTrip(this.model);
    this.openUpdateForm = false;
  }


}
