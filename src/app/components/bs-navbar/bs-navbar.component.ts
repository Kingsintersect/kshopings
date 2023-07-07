import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/model/app-user';
import { ShoppingCart } from 'src/app/model/shopping-cart';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {
  appUser!: AppUser;
  cart$!: Observable<ShoppingCart>;

  constructor(
    private userService: UserService, 
    private auth: AuthService, 
    private router: Router, 
    public toast: HotToastService,
    private cartService: ShoppingCartService) {
    // userService.currentUserprofile$.subscribe(appUser => this.appUser = appUser!)
    // auth.appUser$.subscribe(appUser => this.appUser = appUser)
  }
  async ngOnInit() {
    this.auth.currentUser$.subscribe(user => this.appUser = user!);
    this.cart$ = await this.cartService.getCart();
  }

  logout(){
    this.auth.logout().pipe(
      this.toast.observe({
        loading: "Loading...",
        success: "You successfuly Logged out!",
        error: "Problem Logging You Out"
      })
    ).subscribe(() => this.router.navigate(['']) )
  }

}
