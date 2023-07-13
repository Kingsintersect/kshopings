import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import * as firebase from 'firebase/auth';
import { from, Observable } from 'rxjs';

import { AppUser } from '../model/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fs: Firestore) { }

  save(user: firebase.User) {
    const ref = doc(this.fs, 'users', user?.uid);
    return from(updateDoc(ref, {
      name: user.displayName,
      email: user.email
    }));
  }

  get(uid: string){
    const ref = doc(this.fs, 'users', uid);
    return docData(ref) as Observable<AppUser>;
  }
}
