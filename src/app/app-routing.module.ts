import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AdminOrdersComponent } from './admin/component/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/component/admin-products/admin-products.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { adminAuthGuard, authGuard } from './functions/auth.guard';
import { ProductFormComponent } from './admin/component/product-form/product-form.component';

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
    // canActivate: [authGuard],
  },
  { 
    path: 'my/orders', component: MyOrdersComponent,
    // canActivate: [authGuard],
  },
  { 
    path: 'order-success', 
    component: OrderSuccessComponent, 
    // canActivate: [authGuard],
  }, 
  
  // ADMIN USERS
  { 
    path: 'admin/products/new', 
    component: ProductFormComponent, 
    // canActivate: [authGuard, adminAuthGuard] 
  },
  { 
    path: 'admin/products/:id', 
    component: ProductFormComponent, 
    // canActivate: [authGuard, adminAuthGuard] 
  },
  { 
    path: 'admin/products', 
    component: AdminProductsComponent, 
    // canActivate: [authGuard, adminAuthGuard] 
  },
  { 
    path: 'admin/orders', 
    component: AdminOrdersComponent, 
    // canActivate: [authGuard, adminAuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
