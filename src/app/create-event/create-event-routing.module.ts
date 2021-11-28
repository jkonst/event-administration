import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateEventComponent} from './create-event.component';
import {CreateEventRoutingGuard} from './create-event-routing.guard';

const routes: Routes = [{
  path: '',
  component: CreateEventComponent,
  canActivate: [CreateEventRoutingGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEventRoutingModule {
}
