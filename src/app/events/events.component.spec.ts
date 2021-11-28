import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MatCardModule} from '@angular/material/card';
import {RouterTestingModule} from '@angular/router/testing';
import {MatIconModule} from '@angular/material/icon';
import {By} from '@angular/platform-browser';
import {MatPaginatorModule} from '@angular/material/paginator';
import {of} from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EventsComponent} from './events.component';
import {EventsHeadlineComponent} from './events-headline/events-headline.component';
import {EventsStore} from './services/events.store';
import {EventCategory} from './model/event';
import {runOnPushChangeDetection} from '../shared/utils/helper';
import {dummyEvents} from '../shared/utils/test-event-data';
import {MatDialogModule} from '@angular/material/dialog';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let eventsStore: EventsStore;
  let fixture: ComponentFixture<EventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsComponent, EventsHeadlineComponent],
      imports: [
        MatCardModule,
        RouterTestingModule,
        MatIconModule,
        MatDialogModule,
        MatPaginatorModule,
        BrowserAnimationsModule
      ],
      providers: [EventsComponent, EventsStore]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    eventsStore = TestBed.inject(EventsStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show events', () => {
    component.category = EventCategory.UPCOMING;
    jest.spyOn(eventsStore, 'getEventsByCategory')
      .mockReturnValue(of(dummyEvents.filter(event => event.startDateTime
        && event.startDateTime > new Date())));
    component.ngOnInit();
    runOnPushChangeDetection(fixture).then(() => {
      fixture.detectChanges();
      const refreshWrapper = fixture.debugElement.query(By.css('.refresh-wrapper'));
      expect(refreshWrapper).toBeTruthy();
    });
  });

  it('should refresh events list', () => {
    component.category = EventCategory.UPCOMING;
    jest.spyOn(eventsStore, 'getEventsByCategory')
      .mockReturnValue(of(dummyEvents.filter(event => event.startDateTime &&
        event.startDateTime > new Date())));
    component.ngOnInit();
    runOnPushChangeDetection(fixture).then(() => {
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('.refresh-wrapper button'));
      expect(button).toBeTruthy();
      jest.spyOn(eventsStore, 'refreshEventsList');
      button.nativeElement.click();
      fixture.detectChanges();
      expect(eventsStore.refreshEventsList).toHaveBeenCalled();
    });
  });


});
