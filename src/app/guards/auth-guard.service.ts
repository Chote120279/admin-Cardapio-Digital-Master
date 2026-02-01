import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * AuthGuard - Guard to protect routes that require authentication
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return from(this.authService.logado()).pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          return false;
        }
      })
    );
  }
}
