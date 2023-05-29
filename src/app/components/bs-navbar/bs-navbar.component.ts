import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AppUser } from 'src/app/model/app-user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent {
  appUser!: AppUser | null;

  constructor(private userService: UserService, private auth: AuthService, private router: Router, public toast: HotToastService) {
    userService.currentUserprofile$.subscribe(appUser => this.appUser = appUser)
    // auth.appUser$.subscribe(appUser => this.appUser = appUser)
  }

  logout(){
    this.auth.logout().pipe(
      this.toast.observe({
        loading: "Loading...",
        success: "You successfuly Logged out!",
        error: "Problem Logging You Out"
      })
    ).subscribe(() => {
      this.router.navigate(['']);
    })
  }

}
