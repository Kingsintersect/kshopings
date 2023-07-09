import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'sheard/model/order';
import { ShoppingCart } from '../../model/shopping-cart';
import { AuthService } from 'sheard/services/auth.service';
import { OrderService } from 'sheard/services/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  checkoutForm = this.fb.group({
    name: ['', [Validators.required]],
    // address: this.fb.group({
      phoneNumber: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]]
    // }),
  });

     // GETTERS FOR THIS FORM
   get name() { return this.checkoutForm.get('name')!; }
   get phoneNumber() { return this.checkoutForm.get('phoneNumber')!; }
   get street() { return this.checkoutForm.get('street')!; }
   get city() { return this.checkoutForm.get('city')!; }
   get state() { return this.checkoutForm.get('state')!; }
   get zip() { return this.checkoutForm.get('zip')!; }
   
   @Input('cart') cart!: ShoppingCart;
   shipping = {};
   userId!: string;
   userSubscription!: Subscription;

  constructor(
    private auth: AuthService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private router: Router, 
  ) {}

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  
  async ngOnInit() {
    this.userSubscription = this.auth.currentUser$.subscribe(user => {
        // console.log(user.);
        this.userId= user!.uid
        // this.userId = "RyJVd0RC7FObTyAqscOMOjqGv4V2"
    })
  }

  async placeOrder(){
    if(!this.checkoutForm.valid) return ;
    let x = new Order(this.userId, this.checkoutForm.value, this.cart);
    let order = Object.assign(this.shipping, x)
    
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.id]);
  }

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.name.hasError('email') ? 'Not a valid email' : '';
  }
}
