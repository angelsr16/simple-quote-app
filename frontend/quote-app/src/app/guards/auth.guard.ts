import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isAuthenticated().pipe(
      map((isAuth) => {
        if (isAuth) {
          return true;
        } else {
          this.router.navigate(['/login']); // redirect if not authenticated
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );

    // console.log(this.authService.isAuthenticated());
    // if (this.authService.isAuthenticated()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);

    //   // {
    //   //   queryParams: { returnUrl: state.url },
    //   // }
    //   return false;
    // }
  }
}
