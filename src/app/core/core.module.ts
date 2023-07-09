import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsFooterComponent } from './components/bs-footer/bs-footer.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'app/app-routing.module';
import { MaterialModule } from 'app/material.module';
import { ConfirmDeleteComponent } from './components/dialogs/confirm-delete/confirm-delete.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
  declarations: [
    BsNavbarComponent,
    BsFooterComponent,
    HomeComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    CommonModule,

    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,    
    MatMenuModule,
    MatTabsModule
  ],
  exports: [
    BsNavbarComponent,
    BsFooterComponent,
  ]
})
export class CoreModule { }
