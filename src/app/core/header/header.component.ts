import {Component} from '@angular/core';
import {NavigationService} from '../services/navigation.service';
import {Observable} from 'rxjs';
import {Navigation} from '../model/navigation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  navigation$: Observable<Navigation>;

  constructor(private navigationService: NavigationService) {
    this.navigation$ = this.navigationService.navigation$;
  }

}
