import { Component } from '@angular/core';
import { Observable } from 'rxjs/';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
  orders$!: Observable<any[]>

  constructor(private auth: AuthService, private oderservice: OrderService){
    this.orders$ = this.auth.currentUser$.pipe(
      switchMap(u => this.oderservice.getOrdersByUser(u!.uid))
    )
  }

}
