import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Identity } from '../identity/identity';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private identity: Identity,
    private router: Router
  ) {}

  // ------------------------------------------------------------------------
  // canActivate
  // ------------------------------------------------------------------------
  // This guard runs before any route that uses it. It checks if the user is
  // authenticated in Firebase. If not, it redirects to the /login page.
  // ------------------------------------------------------------------------
  async canActivate(): Promise<boolean | UrlTree> {
    const user = await this.identity.getCurrentUserOnce();  // Current Firebase user or null

    if (user) {
      // User is logged in → allow access to route
      return true;
    }

    // User is NOT logged in → redirect to login page
    return this.router.createUrlTree(['/login']);
  }
}
