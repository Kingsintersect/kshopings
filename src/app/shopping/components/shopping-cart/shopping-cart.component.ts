import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'app/shopping/model/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'sheard/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart$!: Observable<ShoppingCart>;

  constructor(private cartService: ShoppingCartService){}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  clearCart(){
    this.cartService.clearCart();
  }

}
