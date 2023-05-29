import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, UrlTree } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kshopings';

  constructor(private userService: UserService, private auth: AuthService, private router: Router) {
    auth.currentUser$.subscribe(user => {
      if(user) {
        // uncoment latter
        // userService.saveAtSignUp(user)

        // let returnUrl: string = localStorage.getItem('returnUrl')!;
        // if(returnUrl !== null) router.navigateByUrl(returnUrl);
      }
    })
  }
}
