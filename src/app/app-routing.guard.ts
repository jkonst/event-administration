import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {NavigationService} from './core/services/navigation.service';
import {EventsStore} from './events/services/events.store';

@Injectable({
  providedIn: 'root'
})
export class AppRoutingGuard implements CanActivate {
  constructor(private navigationService: NavigationService, private eventsStore: EventsStore) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (state.url.startsWith('/?cat=')) {
      this.navigationService.setNavigation('HOME');
      return true;
    }
    if (state.url === '/') {
      this.navigationService.setNavigation('HOME');
      this.eventsStore.refreshEventsList();
    } else {
      this.navigationService.setNavigation('EVENTS');
    }
    return true;
  }

}
