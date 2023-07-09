import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SheardModule } from 'sheard/sheard.module';

import { BsFooterComponent } from './components/bs-footer/bs-footer.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { ConfirmDeleteComponent } from './components/dialogs/confirm-delete/confirm-delete.component';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [
    BsNavbarComponent,
    BsFooterComponent,
    HomeComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    CommonModule,
    SheardModule
  ],
  exports: [
    BsNavbarComponent,
    BsFooterComponent,
  ]
})
export class CoreModule { }
