import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventCategory} from '../../events/model/event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  category: typeof EventCategory = EventCategory;
  count: number;

  constructor(private route: ActivatedRoute) {
    this.count = Number(this.route.snapshot.queryParamMap.get('cat')) as EventCategory;
    switch (this.count) {
      case 0:
        this.count = 0;
        break;
      case EventCategory.PAST:
        this.count = 0;
        break;
      case EventCategory.UPCOMING:
        this.count = 1;
        break;
      default:
        this.count = 0;
    }
  }
}
