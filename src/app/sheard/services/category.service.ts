import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private collectionInstance: CollectionReference<DocumentData>;
  categoryData!: Observable<any>;

  constructor(
    private fs: Firestore,
    private toast: HotToastService) {
    this.collectionInstance = collection(this.fs, 'categories');
  }

  getAll()  {
    this.categoryData = collectionData(this.collectionInstance, {idField: 'id'});
    return this.categoryData
  }

  addCategory(formValue: HTMLOptionsCollection) {
    addDoc(this.collectionInstance, formValue)
      .then((res) => {
        this.toast.observe({
          loading: 'Loading...',
          success: 'Category Data Saved Succesfully',
          error: 'Failed To Save Data'
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  updteCategory(id: string) {
    const docInstance = doc(this.fs, 'categories', id);
    const formData = {
      name: 'updatedName'
    }
    updateDoc(docInstance, formData)
      .then((res) => {
        this.toast.observe({
          loading: 'Loading...',
          success: 'Category Data Updated Succesfully',
          error: 'Failed To Update Data'
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  deleteCategory(id: string) {
    const docInstance = doc(this.fs, 'categories', id);
    deleteDoc(docInstance)
      .then((res) => {
        this.toast.observe({
          loading: 'Loading...',
          success: 'Category Data Deleted Succesfully',
          error: 'Failed To Update Data'
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

}
