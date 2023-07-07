import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmDeleteComponent } from 'src/app/components/dialogs/confirm-delete/confirm-delete.component';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnDestroy, OnInit, AfterViewInit {
  products: any[] = [];
  subscription: Subscription;

  displayedColumns: string[] = ['title', 'price', 'category', 'actions'];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService, private router: Router, private dialog: MatDialog) {
    this.subscription = productService.getAll().subscribe( (products) => {
      this.products = products;

      // adding pagination and sorting
      this.dataSource = new MatTableDataSource<Product>(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    // this.getAllProducts();
  }
  

  applyFilter(event: Event){
    // this.filteredProducts = (query) ? 
    //   this.products.filter( p => p.title.toLowerCase().includes(query.toLowerCase())) : 
    //   this.products;

    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();

    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRow(row: any) {
    // console.log(row)
  }

  editProduct(id: string){
    this.router.navigate(['/admin/products/'+id])
  }

  deleteProduct(id: string){
    this.dialog.open(ConfirmDeleteComponent, {
      minWidth: '250px',
      minHeight: '150px'
    }).afterClosed().subscribe(res => {
      console.log(res);
    }); 
    return;
    if(!confirm('Confirm You Want To Delete This Product?')) return;
    
    this.productService.delete(id);
    this.router.navigate(['/admin/products']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
