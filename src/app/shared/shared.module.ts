import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from '@angular-material-components/datetime-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {EventFormComponent} from './event-form/event-form.component';
import {SuccessDialogComponent} from './event-form/success-dialog/success-dialog.component';
import {DateTimePickerGroupComponent} from './event-form/date-time-picker-group/date-time-picker-group.component';
import {EventTitleComponent} from './event-form/event-title/event-title.component';
import {LocationsComponent} from './event-form/locations/locations.component';
import {SpinnerComponent} from './event-form/spinner/spinner.component';
import {CreateEventRoutingModule} from '../create-event/create-event-routing.module';

@NgModule({
  declarations: [
    EventFormComponent,
    SuccessDialogComponent,
    DateTimePickerGroupComponent,
    EventTitleComponent,
    LocationsComponent,
    SpinnerComponent
  ],
  exports: [
    EventFormComponent,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    HttpClientModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CreateEventRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
    NgxMatNativeDateModule
  ]
})
export class SharedModule { }
