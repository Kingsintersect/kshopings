import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ShoppingCart } from 'src/app/model/shopping-cart';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category!: string | null;
  cart$!: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService)
    {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  populateProducts(){
    this.productService.getAll().pipe(
      switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
    )
    .subscribe(params => {
      this.category = params.get('category');
      this.applyFilter();      
    });
  }

  applyFilter(){
    this.filteredProducts = (this.category) ? 
    this.products.filter(p => (p.category).toLowerCase() === (this.category)?.toLowerCase()) :
    this.products;
  }

}
