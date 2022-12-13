import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from './city';
import { CITIES } from './mock-cities';
import { Observable, of } from 'rxjs';

import { HttpHeaders } from '@angular/common/http';

import { CityModel } from './city.model';
import { CityFormComponent } from './city-form/city-form.component';

import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { MessageService } from './message.service';

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

  error = new Subject<string>();
  getError = false;

  cityForm = CityFormComponent;


  constructor(
    //private cityForm: CityFormComponent,
    private messageService: MessageService,
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
  }

  deleteOneCity(cityName: string) {
    
    console.log(cityName);
    console.log('one city deleted');
    this.http.get(this.citiesAPI, httpOptions).subscribe(res => {
      console.log(res);
      let urlKey = '';
      Object.entries(res).forEach(([key, value], index) => {
        //console.log(key, value, index);
        console.log(value.name);
        if (cityName==value.name){
          console.log('match');
          console.log(key);
          urlKey = key;
        }
        
      });
      this.tempURL = urlKey;
      console.log(`delete ${urlKey}`);
      this.http.delete(`https://city-api-test-default-rtdb.firebaseio.com/cities/${urlKey}.json`, httpOptions); 
    });
    console.log(this.tempURL);
    //return this.http.delete(cityURL, httpOptions); 
    
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
