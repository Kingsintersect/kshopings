import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { SignUpComponent } from './membership/components/sign-up/sign-up.component';
import { AdminOrdersComponent } from './admin/component/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/component/admin-products/admin-products.component';
import { CheckOutComponent } from './shopping/components/check-out/check-out.component';
import { SignInComponent } from './membership/components/sign-in/sign-in.component';
import { ProductFormComponent } from './admin/component/product-form/product-form.component';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
import { AuthGuard } from "sheard/services/auth-guard.service";
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
const routes: Routes = [
  
    // ANONYMOUS USERS
    { path: '', component: ProductsComponent },
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent },
    
    { 
      path: 'sign-in', component: SignInComponent 
    },
    { path: 'sign-up', component: SignUpComponent },
    
  // SIGN-IN USER
  { 
    path: 'check-out', 
    component: CheckOutComponent, 
    canActivate: [AuthGuard],
  },
  { 
    path: 'my/orders', component: MyOrdersComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: 'order-success/:id', 
    component: OrderSuccessComponent, 
    canActivate: [AuthGuard],
  }, 
  
  // ADMIN USERS
  { 
    path: 'admin/products/new', 
    component: ProductFormComponent, 
    canActivate: [AuthGuard, AdminAuthGuard] 
  },
  { 
    path: 'admin/products/:id', 
    component: ProductFormComponent, 
    canActivate: [AuthGuard, AdminAuthGuard] 
  },
  { 
    path: 'admin/products', 
    component: AdminProductsComponent, 
    canActivate: [AuthGuard, AdminAuthGuard] 
  },
  { 
    path: 'admin/orders', 
    component: AdminOrdersComponent, 
    canActivate: [AuthGuard, AdminAuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
