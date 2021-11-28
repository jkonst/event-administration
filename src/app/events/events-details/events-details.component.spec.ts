import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsDetailsComponent } from './events-details.component';
import {MatCardModule} from '@angular/material/card';
import {RouterTestingModule} from '@angular/router/testing';
import {MatIconModule} from '@angular/material/icon';

describe('EventsDetailsComponent', () => {
  let component: EventsDetailsComponent;
  let fixture: ComponentFixture<EventsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsDetailsComponent ],
      imports: [
        MatCardModule,
        RouterTestingModule,
        MatIconModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
