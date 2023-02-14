import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AdminService } from 'app/admin.service/admin.service';
import { AuthService } from 'app/auth.service/auth.service';
import { Observable } from 'rxjs';
import { ProductsService } from 'app/products.service/products.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private admin: AdminService,private authService:AuthService, private router: Router, private products:ProductsService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('CanActivate called');
      let isLoggedIn = this.admin.isAdminRole();
     
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
