import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DateTimePickerGroupComponent} from './date-time-picker-group.component';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from '@angular-material-components/datetime-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';

describe('DateTimePickerComponent', () => {
  let component: DateTimePickerGroupComponent;
  let fixture: ComponentFixture<DateTimePickerGroupComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateTimePickerGroupComponent],
      imports: [ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        NgxMatDatetimePickerModule,
        MatDatepickerModule,
        NgxMatNativeDateModule],
      providers: [{provide: FormBuilder, useValue: formBuilder}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimePickerGroupComponent);
    component = fixture.componentInstance;
    component.parentForm = formBuilder.group({
      title: ['', Validators.required],
      duration: formBuilder.group({
        startDateTime: [null, Validators.required],
        endDateTime: [null, Validators.required]
      }),
      description: ['']
    });
    component.groupName = 'duration';
    component.fieldName1 = 'startDateTime';
    component.fieldName2 = 'endDateTime';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
