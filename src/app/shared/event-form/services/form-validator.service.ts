import {Injectable} from '@angular/core';
import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {locations} from '../../../../assets/locations.json';

@Injectable({
  providedIn: 'any'
})
export class FormValidatorService {
  checkEndDateIsAfterStartDateValidator(controlName1: string, controlName2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const startDate = formGroup?.get(controlName1)?.value;
      const endDate = formGroup?.get(controlName2)?.value;
      if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
        return {endDateBeforeStartDate: true};
      }
      return null;
    };
  }

  checkLocationValidity(control: AbstractControl): ValidationErrors | null {
      const selectedLocation = control.value;
      if (selectedLocation && !selectedLocation.name &&
        !locations.find(location => location.name === selectedLocation.name)) {
        return {invalidLocation: true};
      }
      return null;
  }
}
