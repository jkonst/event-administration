import {TestBed} from '@angular/core/testing';
import {FormValidatorService} from './form-validator.service';
import {FormBuilder, Validators} from '@angular/forms';

describe('FormValidatorService', () => {
  let service: FormValidatorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormBuilder]
    });
    service = TestBed.inject(FormValidatorService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return endDateBeforeStartDate: true', () => {
    const startDate = new Date('Fri Nov 17 2023 09:12:51 GMT+0200 (Eastern European Standard Time)');
    const endDate = new Date('Fri Nov 14 2023 09:12:51 GMT+0200 (Eastern European Standard Time)');
    const validatorFn = service.checkEndDateIsAfterStartDateValidator(
      'startDateTime',
      'endDateTime')(new FormBuilder().group({
      title: ['', Validators.required],
      startDateTime: [startDate, Validators.required],
      endDateTime: [endDate, Validators.required],
      description: [''],
      location: [null]
    }));
    expect(validatorFn).toEqual({endDateBeforeStartDate: true});
  });

  it('should return invalidLocation: true', () => {
    const location = 'Test';
    const formGroup = new FormBuilder().group({
      title: ['', Validators.required],
      startDateTime: [null, Validators.required],
      endDateTime: [null, Validators.required],
      description: [''],
      location: [location]
    });
    const validator = service.checkLocationValidity(formGroup.controls.location);
    expect(validator).toEqual({invalidLocation: true});
  });
});
