import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Location} from '../../../events/model/event';
import {locations} from '../../../../assets/locations.json';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  @Input()
  parentForm: FormGroup | undefined;
  @Input()
  label = '';
  @Input()
  fieldName = '';
  locations: Location[] = locations;
  filteredLocations$: Observable<Location[]> | undefined;

  ngOnInit(): void {
    this.filteredLocations$ = this.parentForm?.get(this.fieldName)?.valueChanges.pipe(
      startWith(''),
      map(location => (typeof location === 'string' ? location
        : location ? location.name : null)),
      map(name => (name ? this._filter(name) : this.locations.slice()))
    );
  }

  displayFn(location: Location): string {
    return location && location.name ? location.name : '';
  }

  private _filter(value: string): Location[] {
    const filterValue = value.toLowerCase();
    return this.locations.filter(location => location.name.toLowerCase().includes(filterValue));
  }
}
