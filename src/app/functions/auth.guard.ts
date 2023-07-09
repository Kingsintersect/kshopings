import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterState, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "sheard/services/auth.service";
import { map, catchError, of } from "rxjs";
import { UserService } from "sheard/services/user.service";

export const authGuard = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const state: RouterState = router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
  
    return auth.currentUser$.pipe(
        map((user) => {
            if(user) return true;
    
            router.navigate(['/sign-in'],
            { queryParams: { returnUrl: snapshot.url } });
            return false;
          }),
        catchError(() => {
            // router.navigate(['/sign-in']);
            return of(false);
        })
    )
}

export const adminAuthGuard = () => {
    const auth = inject(AuthService);
    const user = inject(UserService);
    const router = inject(Router);
  
    return user.currentUserprofile$.pipe(
        map(appUser => appUser!.isAdmin));
}