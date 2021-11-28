import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from '@angular-material-components/datetime-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {EventFormComponent} from './event-form.component';
import {EventTitleComponent} from './event-title/event-title.component';
import {DateTimePickerGroupComponent} from './date-time-picker-group/date-time-picker-group.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {LocationsComponent} from './locations/locations.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {HttpClientModule} from '@angular/common/http';

describe('EventFormComponent', () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EventFormComponent,
        SpinnerComponent,
        EventTitleComponent,
        LocationsComponent,
        DateTimePickerGroupComponent
      ],
      imports: [ReactiveFormsModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        MatInputModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgxMatDatetimePickerModule,
        MatDatepickerModule,
        NgxMatNativeDateModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
