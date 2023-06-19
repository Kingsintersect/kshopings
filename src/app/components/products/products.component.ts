import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category!: string | null;

  constructor(
    route: ActivatedRoute,
    productService: ProductService){

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

}
