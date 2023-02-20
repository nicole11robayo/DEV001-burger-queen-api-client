import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service/auth.service';
import { ProductsService } from 'app/products.service/products.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService, public router: Router, private productsService: ProductsService) {
   
  }

  deleteToken(){
    this.productsService.productsArray = []
    sessionStorage.clear();
    this.authService.deleteToken();
    localStorage.clear();
    // const dataArr = new Set(this.productsService.arrayNumber);
    // let result: Array<any> = [...dataArr];
    // result.forEach((item: number) => this.productsService.deleteAll(item).subscribe({
    //   next : () => this.router.navigateByUrl('/home')
    // }));
    //this.router.navigateByUrl('/home');

  }
}
