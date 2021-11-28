import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {TestBed} from '@angular/core/testing';
import {AppRoutingGuard} from './app-routing.guard';
import {NavigationService} from './core/services/navigation.service';
import {EventsStore} from './events/services/events.store';

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

describe('AppRoutingGuardGuard', () => {
  let guard: AppRoutingGuard;
  let navigationService: NavigationService;
  let eventsStore: EventsStore;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppRoutingGuard, NavigationService, EventsStore]
    });
    guard = TestBed.inject(AppRoutingGuard);
  });

  beforeEach(() => {
    navigationService = TestBed.inject(NavigationService);
    eventsStore = TestBed.inject(EventsStore);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should set navigation to `HOME` and refresh events list' +
    ' after routing to /', () => {
    jest.spyOn(navigationService, 'setNavigation');
    jest.spyOn(eventsStore, 'refreshEventsList');
    const canActivate = guard.canActivate({} as ActivatedRouteSnapshot, fakeRouterState('/'));
    expect(navigationService.setNavigation).toHaveBeenCalledWith('HOME');
    expect(eventsStore.refreshEventsList).toHaveBeenCalled();
    expect(canActivate).toBeTruthy();
  });

  it('should set navigation to `HOME` and not refresh events list' +
    ' after routing to /?cat=1', () => {
    jest.spyOn(navigationService, 'setNavigation');
    jest.spyOn(eventsStore, 'refreshEventsList');
    const canActivate = guard.canActivate({} as ActivatedRouteSnapshot, fakeRouterState('/?cat=1'));
    expect(navigationService.setNavigation).toHaveBeenCalledWith('HOME');
    expect(eventsStore.refreshEventsList).not.toHaveBeenCalled();
    expect(canActivate).toBeTruthy();
  });

  it('should set navigation to `EVENTS` and not refresh events list' +
    ' after routing to /events/77744b42?cat=1', () => {
    jest.spyOn(navigationService, 'setNavigation');
    jest.spyOn(eventsStore, 'refreshEventsList');
    const canActivate = guard.canActivate({} as ActivatedRouteSnapshot,
      fakeRouterState('/events/77744b42?cat=1'));
    expect(navigationService.setNavigation).toHaveBeenCalledWith('EVENTS');
    expect(eventsStore.refreshEventsList).not.toHaveBeenCalled();
    expect(canActivate).toBeTruthy();
  });

});
