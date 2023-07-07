import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/model/shopping-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})


export class CheckOutComponent implements OnInit {
   cart$!: Observable<ShoppingCart>;

  constructor(
    private cartService: ShoppingCartService,
  ) {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

}
