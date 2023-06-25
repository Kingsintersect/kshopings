import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category!: string | null;
  cart: any;
  subscription!: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private cartService: ShoppingCartService)
    {

    productService.getAll().pipe(
      switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      })
    )
    .subscribe(params => {
      this.category = params.get('category');

      this.filteredProducts = (this.category) ? 
        this.products.filter(p => (p.category).toLowerCase() === (this.category)?.toLowerCase()) :
        this.products;
    })
  }


  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).subscribe(cart => this.cart = cart)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
