import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  updateProfile,
  User,
} from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/membership/services/user.service';
// import * as firebase from 'firebase/auth';
import { from, Observable, of, switchMap } from 'rxjs';

import { AppUser } from '../../membership/model/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$!: Observable<User>
  // user$!: Observable<firebase.User>

  constructor( private auth: Auth, private userService: UserService, private route: ActivatedRoute ) {
    this.user$ = authState(this.auth) as unknown as Observable<User>;
   }

  signIn(username: string, password: string, remember: string) {
    if(remember)console.log(remember);
    this.defineReturnUrl();
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  signUp(name: string, email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(switchMap(({ user }) => updateProfile(user, { displayName: name })))
  }

  googleSignIn() {
    this.defineReturnUrl();
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    return from(signInWithRedirect(this.auth, new GoogleAuthProvider()))
  }

  signOut() {
    return from(this.auth.signOut())
  }

  defineReturnUrl(){    
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
  }

  get appUser$(): Observable<AppUser|null> {
    return this.user$.pipe(
      switchMap(user => {
        if(user) return this.userService.get(user.uid);

        return of(null);
      })
    )
  }
  
}










// export class AuthService {

//   user$!: Observable<firebase.User>;

//   constructor(private auth: AngularFireAuth, private userService: UserService, private router: Router, private route: ActivatedRoute) {  
//     this.user$ = this.auth.authState as unknown as Observable<firebase.User> 
//   }

//   signIn(email: string, password: string) {
//     this.defineReturnUrl();
//     return of(this.auth.signInWithEmailAndPassword(email, password));
//   }

//   signUp(name: string, email: string, password: string){
//     return of(this.auth.createUserWithEmailAndPassword(email, password)).pipe(
//       // switchMap((user) => this.auth.updateCurrentUser(user))
//     )
//   }


//   googleSignIn(){
//     this.defineReturnUrl();
//     return from(this.auth.signInWithRedirect(new firebase.GoogleAuthProvider()))
//   }

//   signOut(){
//     return of(this.auth.signOut());
//   }

//   defineReturnUrl(){    
//     let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
//     localStorage.setItem('returnUrl', returnUrl);
//   }

//   get appUser$(): Observable<AppUser|null> {
//     return this.user$.pipe(
//       switchMap(user => {
//         if(user) return this.userService.get(user.uid);

//         return of(null);
//       })
//     )
//   }
// }