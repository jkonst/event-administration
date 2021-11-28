import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatIconModule} from '@angular/material/icon';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from '@angular-material-components/datetime-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EditDialogComponent} from './edit-dialog.component';
import {EventCategory} from '../model/event';
import {LocationsComponent} from '../../shared/event-form/locations/locations.component';
import {EventFormComponent} from '../../shared/event-form/event-form.component';
import {SpinnerComponent} from '../../shared/event-form/spinner/spinner.component';
import {EventTitleComponent} from '../../shared/event-form/event-title/event-title.component';
import {DateTimePickerGroupComponent} from '../../shared/event-form/date-time-picker-group/date-time-picker-group.component';
import {dummyEvents} from '../../shared/utils/test-event-data';
import {EventFormService} from '../../shared/event-form/services/event-form.service';
import {of} from 'rxjs';
import {Status} from '../model/status';

describe('EditDialogComponent', () => {
  let component: EditDialogComponent;
  let fixture: ComponentFixture<EditDialogComponent>;
  let service: EventFormService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EditDialogComponent,
        EventFormComponent,
        SpinnerComponent,
        EventTitleComponent,
        DateTimePickerGroupComponent,
        LocationsComponent
      ],
      imports: [
        MatIconModule,
        MatInputModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatAutocompleteModule,
        NgxMatDatetimePickerModule,
        MatDatepickerModule,
        NgxMatNativeDateModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            event: dummyEvents[0],
            category: EventCategory.UPCOMING
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogComponent);
    service = TestBed.inject(EventFormService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close when status is `SUCCESS`', () => {
    jest.spyOn(component, 'close');
    service.submissionStatus$ = of(Status.SUCCESS);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.close).toHaveBeenCalled();
  });


});
