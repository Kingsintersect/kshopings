import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminOrdersComponent } from './component/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './component/admin-products/admin-products.component';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material.module';
import { AppRoutingModule } from 'app/app-routing.module';
import { SheardModule } from "../sheard/sheard.module";



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
        
        AppRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        SheardModule,
    ]
})
export class AdminModule { }
