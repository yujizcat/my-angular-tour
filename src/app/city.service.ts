import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from './city';
import { CITIES } from './mock-cities';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'

import { HttpHeaders } from '@angular/common/http';

import { CityModel } from './city.model';
import { CityFormComponent } from './city-form/city-form.component';

import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { MessageService } from './message.service';
import { CitiesComponent } from './cities/cities.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})



export class CityService {

  citiesUrl = 'api/cities';  // URL to web api
  citiesAPI = 'https://city-api-test-default-rtdb.firebaseio.com/cities.json'

  weatherAPIKey = "16a3a52f0eb2bac1c40260b5c9e04a47"
  cityName = "";
  weatherURL = "";

  tempURL = "tempURL";
  tempValue = "tempValue";

  error = new Subject<string>();
  getError = false;

  citiesSubject = new Subject();
  sub$ = this.citiesSubject.asObservable();




  constructor(
    //private cityForm: CityFormComponent,
    // private cities: CitiesComponent,
    private http: HttpClient,
  ) { }

  getCities(): Observable<City[]> {
    const cities = of(CITIES);
    //this.messageService.add('Your travel history');
    return cities;
  }

  getCity(id: number): Observable<City> {
    const city = CITIES.find(h => h.id === id)!;
    return of(city);
  }

  AddCity(city: City) {
    //CITIES.push(city);
    const currentId = CITIES.length;
    const citywithid = { id: currentId + 1, population: city.population, country: city.country, cost: city.cost, name: city.name }

    //const citywithid = { ...city, id: 11};
    CITIES.push(citywithid);
    //console.log(citywithid);
    console.log(CITIES);
  }


  async createCity(city: CityModel) {

    const cityAPIData = await this.getWeather(city.name);

    
    
    
    if (isNaN(cityAPIData)) {
      console.log(typeof cityAPIData);
      var currentWeather = (cityAPIData.list[0].weather[0].main);
      var currentTemperature = Math.round((cityAPIData.list[0].main.temp) - 273.5);
      console.log(currentWeather, currentTemperature);
      const cityData: CityModel = { name: city.name, population: cityAPIData.city.population, country: cityAPIData.city.country, weather: currentWeather, temperature: currentTemperature };
      this.http
        .post<{ name: string }>(
          this.citiesAPI, cityData
        ).subscribe(responseData => {
          console.log(responseData);
        });
     
    } else {
      //this.cityForm.causedError();
      console.log('cause error not found');
      
    }

   
  }

  fetchCities() {
    console.log('Fetching city');
    return this.http
      .get<{ [key: string]: CityModel }>(this.citiesAPI)
      .pipe(
        map(responseData => {
          const citiesArray: CityModel[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              citiesArray.push({ ...responseData[key] });
            }
          }

          return citiesArray;
        })
      )
  }

  deleteCities() {
    return this.http.delete(this.citiesAPI);
    //console.log('test delete');
    //return this.http.delete(`https://city-api-test-default-rtdb.firebaseio.com/cities/${this.tempURL}.json`, httpOptions);
    
  }

   deleteOneCity(cityName: string) {
    console.log(cityName);
     this.http.get(this.citiesAPI, httpOptions)
     .subscribe(res => {
      if (res) {
      console.log(res);
      let urlKey = '';
      Object.entries(res).forEach(([key, value], index) => {
  
        if (cityName==value.name){
          urlKey = key;
        }
        
      });
      
      this.tempURL = urlKey;
      console.log(`delete ${urlKey}`);
      }
      return this.http.delete(`https://city-api-test-default-rtdb.firebaseio.com/cities/${this.tempURL}.json`, httpOptions)
      .subscribe(res => {
        console.log('refresh');
        this.citiesSubject.next(cityName);
      })
    });
    
    alert('Deleted');
    console.log('success deleted');
    console.log(this.tempURL);
    
  }


  async getWeather(city: string): Promise<any> {


    this.cityName = city;
    this.updateCityAPI();
    //console.log(this.weatherURL);

    const response = await fetch(this.weatherURL);
    if (response.status == 200) {
      var data = await response.json();
      console.log(data);
      return data;
    } else {
      return 0;
    }







  }

  updateCityAPI() {
    this.weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${this.cityName}&appid=${this.weatherAPIKey}`;
  }

  



}
