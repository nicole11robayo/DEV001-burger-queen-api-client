import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service/auth.service';
import { ProductsService } from 'app/products.service/products.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
role: any;
  constructor(private authService: AuthService, public router: Router, private productsService: ProductsService) {
   
  }
  ngOnInit() {
    this.obtenerRol()
  }
  
  deleteToken(){
    this.productsService.productsArray = []
    this.productsService.deleteAll().subscribe({
      next : () => {
       
        sessionStorage.clear();
      }
    })
    this.authService.deleteToken();
    sessionStorage.clear();
    this.router.navigateByUrl('/home')

  }

  obtenerRol(){
    return this.role = this.productsService.getrole();
  }
}
