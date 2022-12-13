import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Itinerary } from './itinerary';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { doc, deleteDoc } from "firebase/firestore";
import { getDatabase, ref, remove } from "firebase/database"; 

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  constructor(
    private http: HttpClient,
  ) { }

  itineraryUrl = 'api/itinerary';  // URL to web api
  itineraryAPI = 'https://city-api-test-default-rtdb.firebaseio.com/itinerary.json'

  itinerary: string[]= [];

  add(itin:string){
    this.itinerary.push(itin);

  }

  clear(){
    this.itinerary=[];
  }

  async createItinerary(itinerary: Itinerary){
    const itineraryData: Itinerary = {city: itinerary.city,date: itinerary.date, cost: itinerary.cost};
    this.http
      .post<{ name: string }>(
        this.itineraryAPI, itineraryData
      ).subscribe(responseData => {
        console.log(responseData);
      });
  }

  fetchItinerary() {
    console.log('Fetching itin');
    return this.http
      .get<{ [key: string]: Itinerary }>(this.itineraryAPI)
      .pipe(
        map(responseData => {
          const citiesArray: Itinerary[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              citiesArray.push({ ...responseData[key] });
            }
          }

          return citiesArray;
        })
      )
  }


  deleteItinerary2() {
    //var testURL = 'https://city-api-test-default-rtdb.firebaseio.com/itinerary.json';
    return this.http.delete(this.itineraryAPI);
    
  }

  updateTrip(){
    
  }

  

}
