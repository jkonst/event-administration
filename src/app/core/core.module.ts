import {NgModule} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {EventsModule} from '../events/events.module';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, HomeComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    RouterModule,
    MatToolbarModule,
    MatTabsModule,
    EventsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
