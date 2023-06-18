import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { take } from "rxjs";
// import { CustomFormsModule, CustomValidators } from 'ng2-validation'
import { DocumentSnapshot, DocumentData } from '@angular/fire/firestore';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  private fb = inject(FormBuilder);

  productForm = this.fb.group({
    // name: [null, [Validators.required, Validators.minLength(4)]],
    title: [null, Validators.required],
    price: [null, [Validators.required, Validators.minLength(4),]],
    category: [null, Validators.required],
    imgUrl: [null, Validators.required],
  });

  id: string|null;
  categories$: any = [];
  products: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private catService: CategoryService, 
    private productService: ProductService){

    this.categories$ = catService.getCategories();

    this.id = route.snapshot.paramMap.get('id');
    if (this.id) this.productService.getOneById(this.id)
      .pipe(take(1))
        .subscribe( p => this.products = p)
  }

  // GETTERS FOR THIS FORM
  // get name() { return this.productForm.get('name')!; }
  get title() { return this.productForm.get('title')!; }
  get price() { return this.productForm.get('price')!; }
  get category() { return this.productForm.get('category')!; }
  get imgUrl() { return this.productForm.get('imgUrl')!; }

  save(): void {
    if (!this.productForm.valid) return;
    if(this.id) this.productService.update(this.id, this.productForm.value);
    else this.productService.create(this.productForm.value)
    
    // this.productForm.reset();
    this.router.navigate(['/admin/products'])
  }

  delete() {
    if(!confirm('Confirm You Want To Delete This Product?')) return;
    
    this.productService.delete(this.id!);
    this.router.navigate(['/admin/products']);
  }
}
