import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SheardModule } from '../sheard/sheard.module';
import { AdminOrdersComponent } from './component/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './component/admin-products/admin-products.component';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';



@NgModule({
    declarations: [
        AdminOrdersComponent,
        AdminProductsComponent,
        ProductFormComponent,
    ],
    providers: [
        AdminAuthGuard
    ],
    imports: [
        CommonModule,
        SheardModule,
    ]
})
export class AdminModule { }
