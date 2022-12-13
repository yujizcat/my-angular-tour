import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Itinerary } from './itinerary';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of, from } from 'rxjs';



import { collection, addDoc, namedQuery } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  constructor(
    private http: HttpClient,
  ) { 
    
   }

  test: any = "test";
  id = 10;
  itineraryUrl = 'api/itinerary';  // URL to web api
  itineraryAPI = 'https://city-api-test-default-rtdb.firebaseio.com/itinerary.json';

  itinerary: string[] = [];


  getId() {
    console.log(this.test);
    return this.id;
  }

  add(itin: string) {
    this.itinerary.push(itin);

  }

  clear() {
    this.itinerary = [];
  }

  async createItinerary(itinerary: Itinerary) {
    //itinerary.id = this.getLastId();
    const itineraryData: Itinerary = { id: itinerary.id, city: itinerary.city, date: itinerary.date, cost: itinerary.cost };
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

  updateTrip() {

  }

  getLastId() {
    
    console.log('get last id');
    var result = this.http
      .get<{ [key: string]: Itinerary }>(this.itineraryAPI)
      .pipe(
        map(res => {
          console.log(res);
          this.test = res;
          console.log(this.test);
          return res;

        })
      );
      
    result.subscribe(val => {

      
      let arrayList = this.iterateObject(val);
      let maxId = 0;
      for (let i in arrayList) {
        // console.log(arrayList[i].id);
        if (arrayList[i].id >= maxId) {
          maxId = arrayList[i].id + 1;
        }

      }
      console.log(maxId);
      this.id = maxId;
      console.log(this.id);
      
     return this.id;


    });


  }


  iterateObject(obj: any) {
    var myArray = [];
    // console.log(obj);
    for (let i in obj) {
      console.log(obj[i]);
      myArray.push(obj[i]);
    }

    this.id = 88;
    console.log(this.id);

    // console.log(myArray);
    return myArray;

  }








}
