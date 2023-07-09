import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, User, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, updateProfile } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Observable, from, switchMap } from 'rxjs';
import { AppUser } from '../../membership/model/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$!: Observable<AppUser | null>

  constructor( private auth: Auth, private route: ActivatedRoute) {
    this.currentUser$ = authState(this.auth) as Observable<AppUser | null>;
   }

  signIn(username: string, password: string) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  signUp(name: string, email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(switchMap(({ user }) => updateProfile(user, { displayName: name })))
  }

  GLogin() {
    return from(signInWithRedirect(this.auth, new GoogleAuthProvider()))
  }

  logout() {
    return from(this.auth.signOut())
  }
}
