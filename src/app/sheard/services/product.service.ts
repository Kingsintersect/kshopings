import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Product } from 'sheard/model/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private collectionInstance: CollectionReference<DocumentData>;

  constructor(private fs: Firestore) { 
    this.collectionInstance = collection(this.fs, 'products')
  }

  create(product: any) {
    return addDoc(this.collectionInstance, product)
  }

  getAll() {
    return collectionData(this.collectionInstance, {idField: 'id'}) as Observable<Product[]>;
  }

  getOneById(id: string) {
    const docRef = doc(this.fs, "products", id);
    return docData(docRef)
  }

  update(id: string, newData: {}) {
    const docRef = doc(this.fs, "products", id);
    return updateDoc(docRef, newData);
  }

  delete(id: string) {
    const docRef = doc(this.fs, "products", id);
    return deleteDoc(docRef);
  }

}
