import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'app/auth.service/auth.service';

import { ProductsService } from 'app/products.service/products.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisosGuard implements CanActivate {
  constructor(private products:ProductsService,private authService:AuthService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('CanActivate called');
      let isLoggedIn = this.products.isMeseroRole();
      if (isLoggedIn){
        return true
      } else {
        localStorage.clear();
        this.products.productsArray = [];
        sessionStorage.clear();
        this.authService.deleteToken();
        this.router.navigate(['/home']);
      }
     return false;
  }
  
}
