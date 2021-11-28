import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Event, EventCategory, UNKNOWN_TEMP} from '../model/event';
import {EventsStore} from '../services/events.store';

@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.scss']
})
export class EventsDetailsComponent {

  event$: Observable<Event | undefined>;
  category: EventCategory;
  unknownTemp = UNKNOWN_TEMP;
  eventId: string | null;
  weatherIconsBaseUrl = 'assets/images/weather-icons/';

  constructor(private route: ActivatedRoute, private eventsStore: EventsStore) {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.category = Number(this.route.snapshot.queryParamMap.get('cat')) as EventCategory;
    this.event$ = this.eventsStore.loadEventById(this.eventId);
  }
}
