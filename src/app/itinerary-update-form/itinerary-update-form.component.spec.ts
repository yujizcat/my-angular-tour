import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryUpdateFormComponent } from './itinerary-update-form.component';

describe('ItineraryUpdateFormComponent', () => {
  let component: ItineraryUpdateFormComponent;
  let fixture: ComponentFixture<ItineraryUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItineraryUpdateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItineraryUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
