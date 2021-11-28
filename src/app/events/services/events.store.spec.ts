import {EventsStore} from './events.store';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {dummyEvents} from '../../shared/utils/test-event-data';
import {EventCategory, Event, UNKNOWN_TEMP} from '../model/event';

describe('EventsStore', () => {
  let service: EventsStore;
  const now = new Date();
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsStore);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new upcoming event', () => {
    const upcomingEvent = dummyEvents.find(event => event.startDateTime &&
      event.startDateTime > now);
    if (upcomingEvent) {
      service.addEvent(upcomingEvent);
      service.upcomingEvents$.subscribe(events => {
        expect(events.length).toBe(1);
        expect(events[0]).toEqual(upcomingEvent);
      });
    } else {
      expect(false).toBeTruthy();
    }
  });

  it('should add a new past event', () => {
    const pastEvent = dummyEvents.find(event => event.startDateTime &&
      event.startDateTime < now);
    if (pastEvent) {
      service.addEvent(pastEvent);
      service.upcomingEvents$.subscribe(events => {
        expect(events.length).toBe(1);
        expect(events[0]).toEqual(pastEvent);
      });
    } else {
      expect(false).toBeTruthy();
    }
  });

  it('should delete a past event', () => {
    const pastEvent = dummyEvents.find(event => event.startDateTime &&
      event.startDateTime < now);
    if (pastEvent) {
      service.addEvent(pastEvent);
      service.delete(pastEvent.id, EventCategory.PAST);
      service.pastEvents$.subscribe(events => {
        expect(events.length).toBe(0);
      });
    } else {
      expect(false).toBeTruthy();
    }
  });

  it('should delete an upcoming event', () => {
    const upcomingEvent = dummyEvents.find(event => event.startDateTime &&
      event.startDateTime > now);
    if (upcomingEvent) {
      service.addEvent(upcomingEvent);
      service.delete(upcomingEvent.id, EventCategory.UPCOMING);
      service.upcomingEvents$.subscribe(events => {
        expect(events.length).toBe(0);
      });
    } else {
      expect(false).toBeTruthy();
    }
  });

  it('should load an upcoming event between 1 upcoming and 1 past events',
    () => {
      const upcomingEvent = dummyEvents.find(event => event.startDateTime &&
        event.startDateTime > now);
      const pastEvent = dummyEvents.find(event => event.startDateTime &&
        event.startDateTime < now);
      if (pastEvent && upcomingEvent) {
        service.addEvent(upcomingEvent);
        service.addEvent(pastEvent);
        service.loadEventById(upcomingEvent.id).subscribe(event => {
          expect(event).toEqual(upcomingEvent);
        });
      } else {
        expect(false).toBeTruthy();
      }
    });

  it('should get past events', () => {
    const upcomingEvent = dummyEvents.find(event => event.startDateTime &&
      event.startDateTime > now);
    const pastEvent = dummyEvents.find(event => event.startDateTime &&
      event.startDateTime < now);
    if (pastEvent && upcomingEvent) {
      service.addEvent(upcomingEvent);
      service.addEvent(pastEvent);
      service.getEventsByCategory(EventCategory.PAST).subscribe(events => {
        expect(events.length).toBe(1);
        expect(events[0]).toEqual(pastEvent);
      });
    } else {
      expect(false).toBeTruthy();
    }
  });

  it('should get upcoming events', () => {
    const upcomingEvent = dummyEvents.find(event => event.startDateTime &&
      event.startDateTime > now);
    const pastEvent = dummyEvents.find(event => event.startDateTime &&
      event.startDateTime < now);
    if (pastEvent && upcomingEvent) {
      service.addEvent(upcomingEvent);
      service.addEvent(pastEvent);
      service.getEventsByCategory(EventCategory.UPCOMING).subscribe(events => {
        expect(events.length).toBe(1);
        expect(events[0]).toEqual(upcomingEvent);
      });
    } else {
      expect(false).toBeTruthy();
    }
  });

  it('should refresh all events', fakeAsync(() => {
    const upcomingEvent = dummyEvents.find(event => event.startDateTime &&
      event.startDateTime > now);
    const pastEvent = dummyEvents.find(event => event.startDateTime &&
      event.startDateTime < now);
    if (pastEvent && upcomingEvent) {
      service.addEvent(upcomingEvent);
      service.addEvent(pastEvent);
      service.refreshEventsList();
      tick(service.REFRESH_TIMEOUT);
      service.pastEvents$.subscribe(events => {
        expect(events.length).toBe(1);
        expect(events[0]).toEqual(pastEvent);
      });
      service.upcomingEvents$.subscribe(events => {
        expect(events.length).toBe(1);
        expect(events[0]).toEqual(upcomingEvent);
      });
    } else {
      expect(false).toBeTruthy();
    }
  }));

  it('should update an upcoming event', fakeAsync(() => {
    const upcomingEvent = dummyEvents.find(event => event.startDateTime &&
      event.startDateTime > now);
    if (upcomingEvent) {
      service.addEvent(upcomingEvent);
      service.updateEvent({...upcomingEvent, title: 'Updated Event'}, EventCategory.UPCOMING);
      tick(service.REFRESH_TIMEOUT);
      service.upcomingEvents$.subscribe(events => {
        expect(events.length).toBe(1);
        expect(events[0].title).toEqual('Updated Event');
      });
    } else {
      expect(false).toBeTruthy();
    }
  }));

  it('should update a past event', fakeAsync(() => {
    const pastEvent = dummyEvents.find(event => event.startDateTime &&
      event.startDateTime < now);
    if (pastEvent) {
      service.addEvent(pastEvent);
      service.updateEvent({...pastEvent, title: 'Updated Event'}, EventCategory.PAST);
      tick(service.REFRESH_TIMEOUT);
      service.pastEvents$.subscribe(events => {
        expect(events.length).toBe(1);
        expect(events[0].title).toEqual('Updated Event');
      });
    } else {
      expect(false).toBeTruthy();
    }
  }));

  it('should update a non-existing event', () => {
    const pastEvent: Event = {id: 'd', title: '', startDateTime: null, endDateTime: null, description: '', temperature: UNKNOWN_TEMP};
    expect(() => service.updateEvent({...pastEvent, title: 'Updated Event'}, EventCategory.PAST))
      .toThrow(new Error('Event not found'));
  });

});
