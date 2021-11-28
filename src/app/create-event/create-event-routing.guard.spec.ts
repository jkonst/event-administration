import {TestBed} from '@angular/core/testing';
import {CreateEventRoutingGuard} from './create-event-routing.guard';
import {HttpClientModule} from '@angular/common/http';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {CreateEventComponent} from './create-event.component';
import {NavigationService} from '../core/services/navigation.service';
import {EventFormService} from '../shared/event-form/services/event-form.service';
import {Status} from '../events/model/status';

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

describe('CreateEventRoutingGuard', () => {
  let guard: CreateEventRoutingGuard;
  let navigationService: NavigationService;
  let eventFormService: EventFormService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateEventComponent, NavigationService, EventFormService],
      imports: [HttpClientModule]
    });
    guard = TestBed.inject(CreateEventRoutingGuard);
  });

  beforeEach(() => {
    navigationService = TestBed.inject(NavigationService);
    eventFormService = TestBed.inject(EventFormService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should set navigation and status after routing to /create-event', () => {
    jest.spyOn(navigationService, 'setNavigation');
    jest.spyOn(eventFormService, 'setStatus');
    const canActivate = guard.canActivate({} as ActivatedRouteSnapshot, fakeRouterState('/create-event'));
    expect(navigationService.setNavigation).toHaveBeenCalledWith('ADD_EVENT');
    expect(eventFormService.setStatus).toHaveBeenCalledWith(Status.INIT);
    expect(canActivate).toBeTruthy();
  });

  it('should only activate after routing to /create-event?q=test', () => {
    jest.spyOn(navigationService, 'setNavigation');
    jest.spyOn(eventFormService, 'setStatus');
    const canActivate = guard.canActivate({} as ActivatedRouteSnapshot,
      fakeRouterState('/create-event?q=test'));
    expect(navigationService.setNavigation).not.toHaveBeenCalled();
    expect(eventFormService.setStatus).not.toHaveBeenCalled();
    expect(canActivate).toBeTruthy();
  });
});
