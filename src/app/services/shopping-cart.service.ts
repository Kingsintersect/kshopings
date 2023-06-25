import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { Product } from '../model/product';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private collectionInstance: CollectionReference<DocumentData>;

  constructor(private fs: Firestore) { 
    this.collectionInstance = collection(this.fs, 'shopping-carts')
  }

  private create() {
    return addDoc(this.collectionInstance, {dateCreated: new Date().getTime()})
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    const docRef = doc(this.fs, "shopping-carts", cartId);
    return docData(docRef)
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId')
    if(cartId) return cartId;
    
    let result = await this.create();
    localStorage.setItem('cartId', result.id);
    return result.id;
  }

  async addToCart (product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product){
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();

    const docRef = doc(this.fs, "shopping-carts", cartId);
    docData(docRef).pipe(
      take(1)
    )
    .subscribe( item => {
      if(item['items']) {
        if(item['items'][product.id]){
          let path = `items.${product.id}.quantity`;
          updateDoc(docRef, { [path]: item['items'][product.id]['quantity'] + change });
        }else{
          let path = `items.${product.id}`;
          updateDoc(docRef, { [path]: {product: product, quantity: change}});
        }        
      }else {
        let path = `items`;
        updateDoc(docRef, { [path]: {[product.id]: {product: product, quantity: change} } })
      }
    })
  }

}