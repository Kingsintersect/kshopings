import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'app/app-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialModule } from 'app/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MaterialModule,
    NgbModule,
  ]
})
export class MembershipModule { }
