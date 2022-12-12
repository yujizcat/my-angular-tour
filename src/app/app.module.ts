import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitiesComponent } from './cities/cities.component';

import { FormsModule } from '@angular/forms';
import { CityDetailsComponent } from './city-details/city-details.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import {RouterModule} from '@angular/router';
import { CityFormComponent } from './city-form/city-form.component';
import { ItineraryComponent } from './itinerary/itinerary.component';



@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    CityDetailsComponent,
    MessagesComponent,
    DashboardComponent,
    CityFormComponent,
    ItineraryComponent,
   
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
