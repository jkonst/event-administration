import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutingGuard} from './app-routing.guard';
import {HomeComponent} from './core/home/home.component';
import {EventsDetailsComponent} from './events/events-details/events-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AppRoutingGuard]
  },
  {
    path: 'events/:eventId',
    component: EventsDetailsComponent,
    canActivate: [AppRoutingGuard]
  },
  {
    path: 'create-event',
    loadChildren: () => import('./create-event/create-event.module')
      .then(m => m.CreateEventModule)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
