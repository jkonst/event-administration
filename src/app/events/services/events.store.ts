import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';
import {Event, EventCategory} from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventsStore {
  private pastEventsSubject = new BehaviorSubject<Event[]>([]);
  pastEvents$: Observable<Event[]> = this.pastEventsSubject.asObservable();
  private upcomingEventsSubject = new BehaviorSubject<Event[]>([]);
  upcomingEvents$: Observable<Event[]> = this.upcomingEventsSubject.asObservable();
  private isRefreshingSubject = new BehaviorSubject<boolean>(false);
  isRefreshing$: Observable<boolean> = this.isRefreshingSubject.asObservable();
  REFRESH_TIMEOUT = 500;

  getEventsByCategory(category: EventCategory): Observable<Event[]> {
    if (category === EventCategory.PAST) {
      return this.pastEvents$;
    } else {
      return this.upcomingEvents$;
    }
  }

  updateEvent(event: Event, category: EventCategory): void {
    let idx: number;
    let events: Event[];
    if (category === EventCategory.PAST) {
      events = this.pastEventsSubject.getValue().slice().map(e => ({...e}));
    } else {
      events = this.upcomingEventsSubject.getValue().slice().map(e => ({...e}));
    }
    idx = events.findIndex(e => e.id === event.id);
    if (idx === -1) {
      throw new Error('Event not found');
    }
    events[idx] = event;
    this.updateEventsByCategory(events, category);
    this.refreshEventsList();
  }

  addEvent(event: Event): void {
    if (event.startDateTime && event.endDateTime) {
      const now = new Date();
      const isPastEvent = event.startDateTime < now;
      const events = isPastEvent ? [...this.pastEventsSubject.getValue()] :
        this.upcomingEventsSubject.getValue();
      const newEvents = [event].concat(events).map(evt => ({...evt}));
      if (isPastEvent) {
        this.pastEventsSubject.next(newEvents);
      } else {
        this.upcomingEventsSubject.next(newEvents);
      }
    }
  }

  loadEventById(id: string | null): Observable<Event | undefined> {
    return id ?
      this.pastEvents$.pipe(
        concatMap(d1 => this.upcomingEvents$.pipe
        (
          map(d2 => [...d1, ...d2]),
          map(combined => combined.find(evt => evt.id === id))
        )))
      : of(undefined);
  }

  delete(id: string, category: EventCategory | undefined): void {
    if (category) {
      if (category === EventCategory.PAST) {
        this.deleteEvent(id, this.pastEventsSubject);
      } else {
        this.deleteEvent(id, this.upcomingEventsSubject);
      }
    }
  }

  /**
   * This function is used to refresh the events list time-wise i.e. filter upcoming events
   *  that have become past and move them from upcoming to past
   */
  refreshEventsList(): void {
    if (this.pastEventsSubject.getValue().length > 0 ||
      this.upcomingEventsSubject.getValue().length > 0) {
      this.isRefreshingSubject.next(true);
      const now = new Date();
      const upcomingEvents = this.upcomingEventsSubject.getValue();
      const pastEvents = this.pastEventsSubject.getValue();
      this.updateEventsByCategory(
        pastEvents.filter(evt => evt.startDateTime && evt.startDateTime < now)
          .concat(
            upcomingEvents.filter(evt => evt.startDateTime
              && evt.startDateTime < now)
          ),
        EventCategory.PAST
      );
      this.updateEventsByCategory(
        upcomingEvents.filter(evt => evt.startDateTime && evt.startDateTime >= now)
          .concat(
            pastEvents.filter(evt => evt.startDateTime
              && evt.startDateTime >= now)
          ),
        EventCategory.UPCOMING);
      setTimeout(() => {
        this.isRefreshingSubject.next(false);
      }, this.REFRESH_TIMEOUT);  // timeout for Demo purposes
    }
  }

  /**
   * @param events Upcoming Events or Past Events
   * @param category Past or Upcoming
   * @private
   */
  private updateEventsByCategory(events: Event[], category: EventCategory): void {
    if (category === EventCategory.PAST) {
      this.pastEventsSubject.next(events);
    } else {
      this.upcomingEventsSubject.next(events);
    }
  }

  private deleteEvent(id: string, subject: BehaviorSubject<Event[]>): void {
    const events = subject.getValue();
    const eventToDelete = events.find(evt => evt.id === id);
    if (eventToDelete) {
      subject.next(events.filter(evt => evt.id !== id));
    }
  }
}
