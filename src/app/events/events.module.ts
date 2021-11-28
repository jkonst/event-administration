import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EventsComponent} from './events.component';
import {EventsHeadlineComponent} from './events-headline/events-headline.component';
import {EventsDetailsComponent} from './events-details/events-details.component';
import {EditDialogComponent} from './edit-dialog/edit-dialog.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    EventsComponent,
    EventsHeadlineComponent,
    EventsDetailsComponent,
    EditDialogComponent
  ],
  imports: [
    MatCardModule,
    BrowserAnimationsModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    EventsComponent
  ]
})
export class EventsModule { }
