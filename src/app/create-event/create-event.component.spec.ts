import {CreateEventComponent} from './create-event.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EventFormComponent} from '../shared/event-form/event-form.component';
import {SpinnerComponent} from '../shared/event-form/spinner/spinner.component';
import {EventTitleComponent} from '../shared/event-form/event-title/event-title.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DateTimePickerGroupComponent} from '../shared/event-form/date-time-picker-group/date-time-picker-group.component';
import {MatInputModule} from '@angular/material/input';
import {LocationsComponent} from '../shared/event-form/locations/locations.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from '@angular-material-components/datetime-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {HttpClientModule} from '@angular/common/http';

describe('CreateEventComponent', () => {
  let component: CreateEventComponent;
  let fixture: ComponentFixture<CreateEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateEventComponent,
        EventFormComponent,
        SpinnerComponent,
        EventTitleComponent,
        DateTimePickerGroupComponent,
        LocationsComponent
      ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        NgxMatDatetimePickerModule,
        MatDatepickerModule,
        NgxMatNativeDateModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventComponent);
    component = fixture.componentInstance;
  });

  it('should create the CreateEventComponent', () => {
    expect(component).toBeTruthy();
  });
});
