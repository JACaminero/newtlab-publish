import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.authService.userValue;

    if (user) {
      // check if route is restricted by role
      if (route.data.role && route.data.role.indexOf(user.role) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }

      return true;
    }

    this.router.navigate(['/signin'], {
      queryParams: { returnUrl: state.url },
    });

    return false;
  }
}
