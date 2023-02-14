import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service/auth.service';
import { ProductsService } from '../products.service/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService, public router: Router, private productsService: ProductsService) {
   
  }

  deleteToken(){
    sessionStorage.clear();
    localStorage.clear();
    this.productsService.productsArray = [];
    this.authService.deleteToken();
   
    this.router.navigateByUrl('/home');

  }
}
