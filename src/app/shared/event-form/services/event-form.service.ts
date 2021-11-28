import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {SpinnerService} from '../spinner/services/spinner.service';
import {WeatherApiService} from '../../weather-plugin/services/weather-api.service';
import {Error, EventForecast} from '../../weather-plugin/model/model';
import {EventsStore} from '../../../events/services/events.store';
import {Event, EventCategory, UNKNOWN_TEMP} from '../../../events/model/event';
import {Status} from '../../../events/model/status';

@Injectable({
  providedIn: 'any'
})
export class EventFormService {
  private submissionStatusSubject = new BehaviorSubject<Status>(Status.INIT);
  submissionStatus$: Observable<Status> = this.submissionStatusSubject.asObservable();

  constructor(private weatherService: WeatherApiService,
              private spinnerService: SpinnerService,
              private eventsStore: EventsStore) {
  }

  setStatus(status: Status): void {
    this.submissionStatusSubject.next(status);
  }

  updateEvent(event: Event, changes: Partial<Event>, category: EventCategory): void {
    this.startSubmission();
    const updatedEvent: Event = {...event, ...changes};
    const eventLocationUpdated = event.location && changes.location
      && event.location?.name !== changes.location?.name;
    const eventLocationRemoved = event.location && !changes.location;
    const eventLocationAdded = changes.location && !event.location;
    const locationChanged = eventLocationUpdated || eventLocationRemoved || eventLocationAdded;
    const latitude = locationChanged ? changes.location?.latitude : event.location?.latitude;
    const longitude = locationChanged ? changes.location?.longitude : event.location?.longitude;
    const startDateChanged = event.startDateTime !== changes.startDateTime;
    if (locationChanged || event.location && startDateChanged) {
      this.submitEventWithWeatherInfo(updatedEvent,
        latitude, longitude, category);
    } else {
      this.submitEvent(updatedEvent, undefined, category);
    }
  }

  createEvent(event: Event): void {
    this.startSubmission();
    if (event.location) {
      this.submitEventWithWeatherInfo(event, event.location.latitude, event.location.longitude);
    } else {
      this.submitEvent(event);
    }
  }

  private submitEventWithWeatherInfo(event: Event,
                                     latitude: number | undefined,
                                     longitude: number | undefined,
                                     category?: EventCategory): void {
    this.weatherService.getWeatherInfo(event.startDateTime, latitude, longitude)
      .pipe(take(1)).subscribe(forecast => {
      if (forecast) {
        if ((forecast as Error).message) {
          this.submitEvent({
            ...event,
            temperature: UNKNOWN_TEMP,
            weatherIcon: undefined
          }, forecast as Error, category);
        } else {
          this.submitEvent({
            ...event,
            temperature: `${(forecast as EventForecast).air_temperature}`,
            weatherIcon: (forecast as EventForecast).icon
          }, undefined, category);
        }
      } else {
        this.submitEvent({
          ...event,
          temperature: UNKNOWN_TEMP,
          weatherIcon: undefined
        }, undefined, category);
      }
    });
  }

  private startSubmission(): void {
    this.submissionStatusSubject.next(Status.IN_PROGRESS);
    this.spinnerService.show();
  }

  private submitEvent(event: Event, error?: Error, category?: EventCategory): void {
    if (category) {
      this.eventsStore.updateEvent(event, category);
    } else {
      this.eventsStore.addEvent(event);
    }
    this.spinnerService.hide();
    const status = !error ? Status.SUCCESS : Status.ERROR;
    this.submissionStatusSubject.next(status);
  }
}
