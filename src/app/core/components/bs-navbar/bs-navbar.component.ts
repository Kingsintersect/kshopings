import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AppUser } from 'app/membership/model/app-user';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../../../shopping/model/shopping-cart';
import { AuthService } from 'sheard/services/auth.service';
import { ShoppingCartService } from 'sheard/services/shopping-cart.service';
import { UserService } from 'app/membership/services/user.service';

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
    private cartService: ShoppingCartService) {}
  
  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser!);
    this.cart$ = await this.cartService.getCart();
  }

  logout(){
    this.auth.signOut().pipe(
      this.toast.observe({
        loading: "Loading...",
        success: "You successfuly Logged out!",
        error: "Problem Logging You Out"
      })
    ).subscribe(() => this.router.navigate(['']) )
  }

}
