import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, doc, docData, getDocs, orderBy, query, where } from '@angular/fire/firestore';
import { Order } from '../model/order';
import { ShoppingCartService } from './shopping-cart.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private collectionInstance: CollectionReference<DocumentData>;

  constructor(private fs: Firestore, private cartService: ShoppingCartService) {
    this.collectionInstance = collection(this.fs, 'orders')
  }

  async placeOrder(order: Order){
    let result =  await addDoc(this.collectionInstance, order);
    this.cartService.clearCart();
    return result;
  }

  getOrders() {
    return collectionData(this.collectionInstance, { idField: 'id' }) as unknown as Observable<Order>;
  }

  async getOrdersByUser(userId: string) {
    let orderQuery =  query( this.collectionInstance, where('userId', '==', userId) );
    let querySnapshot = (await getDocs(orderQuery)).docs;
    return querySnapshot.map(x => x.data())
  }

}
