import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Firestore, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { AppUser } from '../model/app-user';
import { Observable, from, of, switchMap } from 'rxjs';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  get currentUserprofile$(): Observable<AppUser | null> {
    return this.auth.currentUser$
      .pipe(
        switchMap(user => {
          if(!user?.uid) return of(null)

          const ref = doc(this.fs, 'users', user?.uid);
          return docData(ref) as Observable<AppUser>;
        })
      )
  }
  get(uid: string){
    const ref = doc(this.fs, 'users', uid);
    return docData(ref) as Observable<AppUser>;
  }

  constructor(private auth: AuthService, private fs: Firestore) { }

  /**
   * TO BE USED DURING SIGN UP TO CREATE USER DOCUMENT
   */
  saveAtSignUp(user:User) {
    const ref = doc(this.fs, 'users', user?.uid)
    return from(setDoc(ref, {
      name: user.displayName,
      email: user.email
    }));
  }

  /**
   * TO BE USED DURING SIGN UP TO CREATE USER DOCUMENT
   */
  // addUser(user: AppUser): Observable<any>{
  //   const ref = doc(this.fs, 'users', user?.uid)
  //   return from(setDoc(ref, user));
  // }

  /**
   * TO UPDATE USER
   */
  // updateUser(user: AppUser): Observable<any>{
  //   const ref = doc(this.fs, 'users', user?.uid)
  //   return from(updateDoc(ref, { ...user }));
  // }
}
