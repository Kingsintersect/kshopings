import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SheardModule } from 'sheard/sheard.module';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    SheardModule,
  ]
})
export class MembershipModule { }
