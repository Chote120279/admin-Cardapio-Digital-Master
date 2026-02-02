import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.logado();
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  // Check if user is logged in
  async logado(): Promise<boolean> {
    // Implementation to check if user is logged in
    // Add your authentication logic here
    // For now, returning true as a placeholder
    return Promise.resolve(true);
  }
}
