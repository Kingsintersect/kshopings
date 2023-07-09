import { Component, Input } from '@angular/core';
import { CategoryService } from 'sheard/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {
  categories$;
  @Input('category') category!: string | null;

  constructor(categoryService: CategoryService){
    
    this.categories$ = categoryService.getAll();
  }

}
