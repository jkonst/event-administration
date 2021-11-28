import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {of} from 'rxjs';
import {EventFormService} from './event-form.service';
import {SpinnerService} from '../spinner/services/spinner.service';
import {WeatherApiService} from '../../weather-plugin/services/weather-api.service';
import {Error} from '../../weather-plugin/model/model';
import {EventsStore} from '../../../events/services/events.store';
import {Status} from '../../../events/model/status';
import {Event, EventCategory} from '../../../events/model/event';
import {dummyEvents, dummyForecast} from '../../utils/test-event-data';

describe('EventFormService', () => {
  let service: EventFormService;
  let spinnerService: SpinnerService;
  let eventsStore: EventsStore;
  let weatherService: WeatherApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [EventFormService, SpinnerService, EventsStore, WeatherApiService]
    });
    service = TestBed.inject(EventFormService);
    spinnerService = TestBed.inject(SpinnerService);
    weatherService = TestBed.inject(WeatherApiService);
    eventsStore = TestBed.inject(EventsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set status to IN_PROGRESS', () => {
    service.setStatus(Status.IN_PROGRESS);
    service.submissionStatus$.subscribe(status => {
      expect(status).toBe(Status.IN_PROGRESS);
    });
  });

  it('should create an event without location', () => {
    const upcomingEvents = dummyEvents.filter(evt => evt.startDateTime
      && evt.startDateTime > new Date());
    if (upcomingEvents) {
      jest.spyOn(eventsStore, 'addEvent');
      jest.spyOn(spinnerService, 'show');
      service.createEvent(upcomingEvents[1]);
      expect(spinnerService.show).toHaveBeenCalled();
      expect(eventsStore.addEvent).toHaveBeenCalledWith(upcomingEvents[1]);
    } else {
      expect(false).toBe(true);
    }
  });

  it('should create an event with location with mock forecast', () => {
    const upcomingEvents = dummyEvents.filter(evt => evt.startDateTime &&
      evt.startDateTime > new Date());
    if (upcomingEvents) {
      jest.spyOn(weatherService, 'getWeatherInfo').mockReturnValue(of(dummyForecast));
      jest.spyOn(eventsStore, 'addEvent');
      jest.spyOn(spinnerService, 'show');
      service.createEvent(upcomingEvents[0]);
      expect(spinnerService.show).toHaveBeenCalled();
      expect(eventsStore.addEvent).toHaveBeenCalledWith({
        ...upcomingEvents[0],
        temperature: `${dummyForecast.air_temperature}`,
        weatherIcon: dummyForecast.icon
      });
    } else {
      expect(false).toBe(true);
    }
  });

  it('should create an event with location with error forecast', () => {
    const upcomingEvents = dummyEvents.filter(evt => evt.startDateTime &&
      evt.startDateTime > new Date());
    if (upcomingEvents) {
      jest.spyOn(weatherService, 'getWeatherInfo')
        .mockReturnValue(of({message: 'Test Error'} as Error));
      jest.spyOn(spinnerService, 'show');
      jest.spyOn(eventsStore, 'addEvent');
      service.createEvent(upcomingEvents[0]);
      expect(spinnerService.show).toHaveBeenCalled();
      expect(eventsStore.addEvent).toHaveBeenCalledWith(upcomingEvents[0]);
    } else {
      expect(false).toBe(true);
    }
  });

  it('should create an event with location with null forecast', () => {
    const upcomingEvents = dummyEvents.filter(evt => evt.startDateTime &&
      evt.startDateTime > new Date());
    if (upcomingEvents) {
      jest.spyOn(weatherService, 'getWeatherInfo')
        .mockReturnValue(of(null));
      jest.spyOn(spinnerService, 'show');
      jest.spyOn(eventsStore, 'addEvent');
      service.createEvent(upcomingEvents[0]);
      expect(spinnerService.show).toHaveBeenCalled();
      expect(eventsStore.addEvent).toHaveBeenCalledWith(upcomingEvents[0]);
    } else {
      expect(false).toBe(true);
    }
  });

  it('should update an event without location', () => {
    const upcomingEvents = dummyEvents.filter(evt => evt.startDateTime
      && evt.startDateTime > new Date());
    const changes: Partial<Event> = {
      title: 'Updated Event'
    };
    if (upcomingEvents) {
      service.createEvent(upcomingEvents[1]);
      jest.spyOn(eventsStore, 'updateEvent');
      jest.spyOn(spinnerService, 'show');
      service.updateEvent(upcomingEvents[1], changes, EventCategory.UPCOMING);
      expect(spinnerService.show).toHaveBeenCalled();
      expect(eventsStore.updateEvent).toHaveBeenCalledWith({...upcomingEvents[1], ...changes}, EventCategory.UPCOMING);
    } else {
      expect(false).toBe(true);
    }
  });

  it('should update an event with location with mock forecast', () => {
    const upcomingEvents = dummyEvents.filter(evt => evt.startDateTime &&
      evt.startDateTime > new Date());
    const changes: Partial<Event> = {
      title: 'Updated Event',
      location: {
        name: 'Graz',
        countryISO: 'AT',
        longitude: 15.4409,
        latitude: 47.0749
      }
    };
    if (upcomingEvents) {
      service.createEvent(upcomingEvents[0]);
      jest.spyOn(weatherService, 'getWeatherInfo').mockReturnValue(of(dummyForecast));
      jest.spyOn(eventsStore, 'updateEvent');
      jest.spyOn(spinnerService, 'show');
      service.updateEvent(upcomingEvents[0], changes, EventCategory.UPCOMING);
      expect(spinnerService.show).toHaveBeenCalled();
      const updatedEvent = {...upcomingEvents[0], ...changes};
      expect(eventsStore.updateEvent).toHaveBeenCalledWith({
        ...updatedEvent,
        temperature: `${dummyForecast.air_temperature}`,
        weatherIcon: dummyForecast.icon
      }, EventCategory.UPCOMING);
    } else {
      expect(false).toBe(true);
    }
  });

});
