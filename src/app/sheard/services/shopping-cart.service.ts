import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, DocumentReference, Firestore, addDoc, collection, deleteField, doc, docData, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Product } from 'sheard/model/product';
import { Observable, map, take } from 'rxjs';
import { SnackbarService } from './helpers/snackbar.service';
import { ShoppingCart } from '../../shopping/model/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private collectionInstance: CollectionReference<DocumentData>;
  // private cartRef = 

  constructor(private fs: Firestore, private snackBar: SnackbarService) { 
    this.collectionInstance = collection(this.fs, 'shopping-carts')
  }


  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    const docRef = doc(this.fs, "shopping-carts", cartId);
    let res =  docData(docRef) as Observable<ShoppingCart>
    return res.pipe(
      map(x => new ShoppingCart(x.items))
    );
  }

  async addToCart (product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product){
    this.updateItem(product, -1);
  }
  
  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    const removeItem = { items: deleteField() };
    let docRef = doc(this.fs, "shopping-carts", cartId);
    updateDoc(docRef, removeItem);
  }
  async checkout() {
    return 'checking out...';
  }

  private create() {
    return addDoc(this.collectionInstance, {dateCreated: new Date().getTime()})
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId')
    if(cartId) return cartId;
    
    let result = await this.create();
    localStorage.setItem('cartId', result.id);
    return result.id;
  }

  private async getItem(cartId: string) {
    const docRef = doc(this.fs, "shopping-carts", cartId);
    return getDoc(docRef).then(x => x.data())
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let cartData = await this.getItem(cartId);
    let refPath = `items.${product.id}`;
    let quantity = ( cartData!['items'] && cartData!['items'][product.id] )? cartData!['items'][product.id]['quantity'] : 0;

    const docRef = doc(this.fs, "shopping-carts", cartId);

    const removeItem = { [refPath]: deleteField() };
    const updateItemField = { [refPath]: {
      title: product.title,
      imgUrl: product.imgUrl,
      price: product.price,
      category: product.category, 
      quantity: quantity + change 
    }}
    
    if(cartData!['items'] && cartData!['items'][product.id] && (quantity == 1) && (change == -1) ){  updateDoc(docRef, removeItem) }
    else{
      updateDoc(docRef, updateItemField);
    }
  }

}
