import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatCardModule} from '@angular/material/card';
import {RouterTestingModule} from '@angular/router/testing';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SimpleChange} from '@angular/core';
import {By} from '@angular/platform-browser';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from '@angular-material-components/datetime-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {EventsHeadlineComponent} from './events-headline.component';
import {EventCategory} from '../model/event';
import {EventsStore} from '../services/events.store';
import {dummyEvents} from '../../shared/utils/test-event-data';
import {runOnPushChangeDetection} from '../../shared/utils/helper';
import {MatDialogModule} from '@angular/material/dialog';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component';
import {EventFormComponent} from '../../shared/event-form/event-form.component';
import {SpinnerComponent} from '../../shared/event-form/spinner/spinner.component';
import {EventTitleComponent} from '../../shared/event-form/event-title/event-title.component';
import {DateTimePickerGroupComponent} from '../../shared/event-form/date-time-picker-group/date-time-picker-group.component';
import {LocationsComponent} from '../../shared/event-form/locations/locations.component';

describe('EventsHeadlineComponent', () => {
  let component: EventsHeadlineComponent;
  let fixture: ComponentFixture<EventsHeadlineComponent>;
  let eventsStore: EventsStore;
  const now = new Date();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EventsHeadlineComponent,
        EditDialogComponent,
        EventFormComponent,
        SpinnerComponent,
        EventTitleComponent,
        LocationsComponent,
        DateTimePickerGroupComponent
      ],
      imports: [
        MatCardModule,
        RouterTestingModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        HttpClientModule,
        MatAutocompleteModule,
        NgxMatDatetimePickerModule,
        MatDatepickerModule,
        NgxMatNativeDateModule,
        MatInputModule,
        MatIconModule,
        MatPaginatorModule,
        BrowserAnimationsModule
      ],
      providers: [EventsHeadlineComponent, EventsStore]
    }).overrideModule(BrowserDynamicTestingModule, {set: {entryComponents: [EditDialogComponent]}})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsHeadlineComponent);
    component = fixture.componentInstance;
    eventsStore = TestBed.inject(EventsStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display as many mat card elements as the upcoming events', () => {
    const upcomingEvents = dummyEvents.filter(event => event.startDateTime &&
      event.startDateTime > now);
    component.events = upcomingEvents;
    component.category = EventCategory.UPCOMING;
    component.ngOnChanges({
      events: new SimpleChange(null, component.events, true)
    });
    runOnPushChangeDetection(fixture).then(() => {
      fixture.detectChanges();
      const events = fixture.debugElement.queryAll(By.css('mat-card'));
      expect(events.length).toEqual(upcomingEvents.length);
    });
  });

  it('should display 1st  event with title: `my Sports Event`', () => {
    const upcomingEvents = dummyEvents.filter(event => event.startDateTime &&
      event.startDateTime > now);
    component.events = upcomingEvents;
    component.category = EventCategory.UPCOMING;
    component.ngOnChanges({
      events: new SimpleChange(null, component.events, true)
    });
    runOnPushChangeDetection(fixture).then(() => {
      fixture.detectChanges();
      const event = fixture.debugElement.queryAll(By.css('mat-card'))[0];
      const title = event.query(By.css('mat-card-title'));
      expect(title.nativeElement.textContent).toEqual(upcomingEvents[0].title);
    });
  });

  it('should delete 1st event after clicking delete button', () => {
    const upcomingEvents = dummyEvents.filter(event => event.startDateTime &&
      event.startDateTime > now);
    component.events = upcomingEvents;
    component.category = EventCategory.UPCOMING;
    component.ngOnChanges({
      events: new SimpleChange(null, component.events, true)
    });
    runOnPushChangeDetection(fixture).then(() => {
      fixture.detectChanges();
      jest.spyOn(eventsStore, 'delete');
      const event = fixture.debugElement.queryAll(By.css('mat-card'))[0];
      const button = event.query(By.css('mat-card-actions button#delete'));
      button.nativeElement.click();
      fixture.detectChanges();
      expect(eventsStore.delete).toHaveBeenCalledWith(upcomingEvents[0].id, component.category);
    });
  });

});
