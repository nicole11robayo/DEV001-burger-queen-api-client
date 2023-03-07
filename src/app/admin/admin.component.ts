import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service/auth.service';
import { ProductsService } from '../products.service/products.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalProductComponent } from 'app/modal-product/modal-product.component'; 
import Swal from 'sweetalert2';
import { ModalUsersComponent } from 'app/modal-users/modal-users.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  products: any = []; 
  users: any =[];
  estado: any ;
  editData:any;

  constructor(private authService: AuthService, private productsService: ProductsService, public dialog: MatDialog ){}

  ngOnInit() {
    this.getUserLogged();
    this.showDBProducts();
    this.estado;

    
   
  }

  openDialog(code:any) {
    this.dialog.open(ModalProductComponent, {
      data:{
        empcode:code
      }
    }).afterClosed().subscribe(val => {
      if(val == 'save'){
        this.showDBProducts();
      }
    })
  }

  openDialogUser() {
    this.dialog.open(ModalUsersComponent, {
      
    });
  }
  showDBProducts(){
    this.productsService.getAllProducts().subscribe({
      next: (data: any) => {
        this.products=data.products;
        this.estado='products'
      }
    })
  }

  

  showDBUsers(){
    this.authService.getAllUsers2().subscribe({
      next: (data: any) => {
        this.users = data.users;
        this.estado='users';
        
      }
    })
  }

  
 
  deleteProduct(id:any){
    this.productsService.getAllProducts().subscribe({
      next: (data: any) => {
        let productsFinal = data.products.filter((product: any) => product.id != `${id}`)
        let productsNew = this.productsService.productsAferDelete(productsFinal)
        this.productsService.setProductDemo(productsNew).subscribe({
          next: (data: any) => {
          
            Swal.fire(
              'Good job!',
              'You clicked the button!',
              'success'
            )
            
          },
          error: (error) => {
            Swal.fire(
              'Good job!',
              'You clicked the button!',
              'error'
            )
           
          }
        })
        this.showDBProducts()
      }
      
    })
    this.showDBProducts()
  }

  getUserLogged() {
    
      const token = this.authService.getUserLogged()
      //console.log(this.authService.getUserLogged())
      this.authService.getUser(token).subscribe(user => {
        console.log(user);
        
      });
    
}
}
