import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'sheard/services/auth.service';
import { UserService } from 'app/membership/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.userService.currentUserprofile$.pipe(
      map(appUser => appUser!.isAdmin)
    );
  }
}
