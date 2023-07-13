import { Component } from '@angular/core';
import { AuthService } from 'sheard/services/auth.service';
import { Router, UrlTree } from '@angular/router';
import { UserService } from 'app/membership/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kshopings';


  constructor(private userService: UserService, private auth: AuthService, private router: Router) {
    this.auth.user$.subscribe(user => {
      if(user) {
        this.userService.save(user);
        
        let returnUrl: string | UrlTree = localStorage.getItem('returnUrl') as string | UrlTree;
        router.navigateByUrl(returnUrl);
      }
    })
  }
}
