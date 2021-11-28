import {NgModule} from '@angular/core';
import {CreateEventComponent} from './create-event.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    CreateEventComponent,
  ],
  imports: [
    SharedModule,
  ]
})
export class CreateEventModule { }
