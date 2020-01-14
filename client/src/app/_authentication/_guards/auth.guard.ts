import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const token = localStorage.getItem('token');

        if (!token) {
            this.router.navigate(['/shop']);
            return false;
        }

        const role = jwtDecode(token).roles[0].authority;

        const expectedRole = route.data.expectedRole;

        for (let i = 0; i < expectedRole.length; i++) {
            if (role === expectedRole[i]) {
                return true;
            }
        }

        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/shop'], { queryParams: { returnUrl: state.url } });   <-- with return url
        this.router.navigate(['/shop']);
        return false;
    }
}
