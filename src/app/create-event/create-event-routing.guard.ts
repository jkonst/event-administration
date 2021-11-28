import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {NavigationService} from '../core/services/navigation.service';
import {EventFormService} from '../shared/event-form/services/event-form.service';
import {Status} from '../events/model/status';

@Injectable({
  providedIn: 'any'
})
export class CreateEventRoutingGuard implements CanActivate {
  constructor(private navigationService: NavigationService,
              private eventFormService: EventFormService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (state.url === '/create-event') {
      this.navigationService.setNavigation('ADD_EVENT');
      this.eventFormService.setStatus(Status.INIT);
    }
    return true;
  }

}
