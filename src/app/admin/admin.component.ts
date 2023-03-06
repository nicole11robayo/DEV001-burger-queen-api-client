import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service/auth.service';
import { ProductsService } from '../products.service/products.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  products: any = []; 
  users: any =[];
  estado: any ;

  constructor(private authService: AuthService, private productsService: ProductsService ){}

  ngOnInit() {
    this.getUserLogged();
    this.showDBProducts();
    this.estado;
   
  }

  showDBProducts(){
    this.productsService.showAllProducts().subscribe({
      next: (data: any) => {
        this.products=data.products;
        this.estado='products'
      }
    })
  }

  

  showDBUsers(){
    this.authService.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data.users;
        this.estado='users';
        
      }
    })
  }

  getUserLogged() {
    
      const token = this.authService.getUserLogged()
      //console.log(this.authService.getUserLogged())
      this.authService.getUser(token).subscribe(user => {
        console.log(user);
        
      });
    
}
}
