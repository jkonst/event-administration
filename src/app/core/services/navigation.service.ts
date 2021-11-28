import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Navigation} from '../model/navigation';

@Injectable({providedIn: 'root'})
export class NavigationService {
  private navigationSubject = new Subject<Navigation>();
  navigation$: Observable<Navigation> = this.navigationSubject.asObservable();

  setNavigation(navigation: Navigation): void {
    this.navigationSubject.next(navigation);
  }

}
