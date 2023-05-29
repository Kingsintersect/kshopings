import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  loginForm = new FormGroup({
    email:      new FormControl('', [Validators.required, Validators.email]),
    password:   new FormControl('', Validators.required),
  });

  constructor(private auth: AuthService, private router: Router, public toast: HotToastService) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  signIn(){
    if(!this.loginForm.valid){
      return;
    }
    const {email, password} = this.loginForm.value;
    this.auth.signIn(email!, password!)
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
    this.auth.GLogin()
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
