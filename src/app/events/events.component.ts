import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Event, EventCategory} from './model/event';
import {EventsStore} from './services/events.store';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent implements OnInit {
  @Input()
  category: EventCategory | undefined;

  events$: Observable<Event[]> | undefined;
  isRefreshing$: Observable<boolean>;
  constructor(private eventsStore: EventsStore) {
    this.isRefreshing$ = this.eventsStore.isRefreshing$;
  }

  ngOnInit(): void {
    this.events$ = this.category ? this.eventsStore.getEventsByCategory(this.category) : of([]);
  }

  refresh(): void {
    this.eventsStore.refreshEventsList();
  }
}
