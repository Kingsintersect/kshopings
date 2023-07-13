import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'sheard/services/auth.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  signInForm = new FormGroup({
    email:      new FormControl('', [Validators.required, Validators.email]),
    password:   new FormControl('', Validators.required),
    remember:   new FormControl('',),
  });
  matcher = new MyErrorStateMatcher();

  constructor(private auth: AuthService, private router: Router, public toast: HotToastService) {}

  get email() { return this.signInForm.get('email'); }
  get password() { return this.signInForm.get('password'); }
  get remember() { return this.signInForm.get('remember'); }

  signIn(){
    if(!this.signInForm.valid){
      console.log("Invalide form Credentials", this.signInForm.value)
      return;
    }
    const {email, password, remember} = this.signInForm.value;
    this.auth.signIn(email!, password!, remember!)
      .pipe(
        this.toast.observe({
          loading: 'Logging in ...',
          success: "Logged In Successfuly",
          error: 'There was an error logging you in!'
        })
      )
      .subscribe(() => {
        this.router.navigate(['/home'])
      });
  }

  googleLogin(){
    this.auth.googleSignIn()
      .pipe(
        this.toast.observe({
          loading: 'Logging in ...',
          success: "Logged In Successfuly",
          error: 'There was an error logging you in!'
        })
      )
      .subscribe(() => {
        this.router.navigate(['/home'])
      });
  }
}
