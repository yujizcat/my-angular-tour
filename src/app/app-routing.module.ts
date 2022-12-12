import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CityDetailsComponent } from './city-details/city-details.component';
import { CityFormComponent } from './city-form/city-form.component';
import { ItineraryComponent } from './itinerary/itinerary.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cities', component: CitiesComponent },
  { path: 'city-form', component: CityFormComponent },
  { path: 'detail/:id', component: CityDetailsComponent },
  { path: 'itinerary', component: ItineraryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}