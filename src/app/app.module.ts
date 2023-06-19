import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { BsFooterComponent } from './components/bs-footer/bs-footer.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AdminOrdersComponent } from './admin/component/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/component/admin-products/admin-products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth.service';
import { HotToastModule } from '@ngneat/hot-toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { UserService } from './services/user.service';

import { ProductFormComponent } from './admin/component/product-form/product-form.component';
import { MuiNavbarComponent } from './components/mui-navbar/mui-navbar.component';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { MaterialModule } from './material.module';
import {MatMenuModule} from '@angular/material/menu';
import { ProductFilterComponent } from './reused-components/product-filter/product-filter.component';
import { ProductCardComponent } from './reused-components/product-card/product-card.component';




@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    BsFooterComponent,
    CheckOutComponent,
    HomeComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    ProductsComponent,
    ShoppingCartComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    SignInComponent,
    SignUpComponent,
    ProductFormComponent,
    MuiNavbarComponent,
    ProductFilterComponent,
    ProductCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    NgbModule,
    HotToastModule.forRoot(),

    // MATERIAL MODULE
    MaterialModule,
    MatMenuModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
