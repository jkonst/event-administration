import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {MatTabsModule} from '@angular/material/tabs';
import {EventsComponent} from '../../events/events.component';
import {EventsHeadlineComponent} from '../../events/events-headline/events-headline.component';
import {MatCardModule} from '@angular/material/card';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ActivatedRoute} from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let route: ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, EventsComponent, EventsHeadlineComponent],
      imports: [
        MatTabsModule,
        MatCardModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatIconModule,
        RouterTestingModule.withRoutes([])
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    route = TestBed.get(ActivatedRoute);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as count 0 for cat param 4', () => {
    const spyRoute = jest.spyOn(route.snapshot.queryParamMap, 'get');
    spyRoute.mockReturnValue('4');
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.count).toEqual(0);
  });

  it('should have as count 1 for cat param 2', () => {
    const spyRoute = jest.spyOn(route.snapshot.queryParamMap, 'get');
    spyRoute.mockReturnValue('2');
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.count).toEqual(1);
  });

  it('should have as count 0 for cat param 1', () => {
    const spyRoute = jest.spyOn(route.snapshot.queryParamMap, 'get');
    spyRoute.mockReturnValue('1');
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.count).toEqual(0);
  });
});
