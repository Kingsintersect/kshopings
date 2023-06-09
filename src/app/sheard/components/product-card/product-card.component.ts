import { Component, Input } from '@angular/core';
import { Product } from 'sheard/model/product';
import { ShoppingCart } from '../../../shopping/model/shopping-cart';
import { ShoppingCartService } from 'sheard/services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input('product') product!: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart!: ShoppingCart;

  constructor(private cartService: ShoppingCartService){}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
