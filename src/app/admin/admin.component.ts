import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service/auth.service';
import { ProductsService } from '../products.service/products.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalProductComponent } from 'app/modal-product/modal-product.component';
import Swal from 'sweetalert2';
import { ModalUsersComponent } from 'app/modal-users/modal-users.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products: any = [];
  users: any = [];
  estado: any;
  editData: any;

  constructor(private authService: AuthService, private productsService: ProductsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getUserLogged();
    this.showDBProducts();
    this.estado;
  }

  openDialog(code: any) {
    this.dialog.open(ModalProductComponent, {
      data: {
        empcode: code
      }
    }).afterClosed().subscribe(val => {
      this.showDBProducts()
      if (val == 'save') {
        this.showDBProducts()

      } else if (val == 'editar') {
        this.showDBProducts()
      }
    })
  }

  openDialogUser(code: any) {
    this.dialog.open(ModalUsersComponent, {
      data: {
        empcode: code
      }
    }).afterClosed().subscribe(val => {
      this.showDBUsers()
      if (val == 'save') {
        this.showDBUsers()

      } else if (val == 'editar') {
        this.showDBUsers()
      }
    })
  }

  showDBProducts() {
    this.productsService.showProductsJson().subscribe({
      next: (data: any) => {
        this.products = data;
        this.estado = 'products'
      }
    })
  }

  showDBUsers() {
    this.authService.showUsersJson().subscribe({
      next: (data: any) => {
        this.users = data;
        this.estado = 'users';
      }
    })
  }

  deleteProduct(id: any) {
    Swal.fire({
      title: 'Estás seguro?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.deleteProductJson(id).subscribe({
          next: (data: any) => {
            Swal.fire(
              'Completado!',
              'Producto eliminado!',
              'success'
            )
            this.showDBProducts()
          },
          error: (error) => {
            Swal.fire(
              'Error!',
              'NO se ha podido eliminar el producto!',
              'error'
            )
          }
    
        })
        this.showDBProducts()

      }
    })
    
  }

  deleteUser(id: any) {
    Swal.fire({
      title: 'Estás seguro?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteUserJson(id).subscribe({
          next: (data: any) => {
            Swal.fire(
              'Completado!',
              'Usuario eliminado!',
              'success'
            )
            this.showDBUsers()
          },
          error: (error) => {
            Swal.fire(
              'Error!',
              'NO se ha podido eliminar el usuario!',
              'error'
            )
          }
    
        })
        this.showDBUsers()

      }
    })
    
  }




  //APIIIII ONLINE
  // ngOnInit() {
  //   this.getUserLogged();
  //   this.showDBProducts();
  //   this.estado;
  // }

  // openDialog(code: any) {
  //   this.dialog.open(ModalProductComponent, {
  //     data: {
  //       empcode: code
  //     }
  //   }).afterClosed().subscribe(val => {
  //     if (val == 'save') {
  //       this.showDBProducts();
  //     } else if (val == 'editar') {
  //       this.showDBProducts()
  //     }
  //   })
  // }

  // openDialogUser(code: any) {
  //   this.dialog.open(ModalUsersComponent, {
  //     data: {
  //       empcode: code
  //     }
  //   }).afterClosed().subscribe(val => {
  //     this.showDBUsers()
  //     if (val == 'save') {
  //       this.showDBUsers()

  //     } else if (val == 'editar') {
  //       this.showDBUsers()
  //     }
  //   })
  // }

  // showDBProducts() {
  //   this.productsService.getAllProducts().subscribe({
  //     next: (data: any) => {
  //       this.products = data.products;
  //       this.estado = 'products'
  //     }
  //   })
  // }

  // showDBUsers() {
  //   this.authService.getAllUsers2().subscribe({
  //     next: (data: any) => {
  //       this.users = data.users;
  //       this.estado = 'users';
  //     }
  //   })
  // }

  // deleteProduct(id: any) {
  //   Swal.fire({
  //     title: 'Estás seguro?',
  //     text: "No podrás revertir esta acción!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Si, eliminar!',
  //     cancelButtonText: 'cancelar',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.productsService.getAllProducts().subscribe({
  //         next: (data: any) => {
  //           let productsFinal = data.products.filter((product: any) => product.id != `${id}`)
  //           let productsNew = this.productsService.productsAferDelete(productsFinal)
  //           this.productsService.setProductDemo(productsNew).subscribe({
  //             next: (data: any) => {
  //               Swal.fire(
  //                 'Completado!',
  //                 'Producto eliminado!',
  //                 'success'
  //               )
  //             },
  //             error: (error) => {
  //               Swal.fire(
  //                 'Error!',
  //                 'NO se ha podido eliminar el producto!',
  //                 'error'
  //               )
  //             }
  //           })
  //           this.showDBProducts()
  //         }
  //       })
  //       this.showDBProducts()

  //     }
  //   })
    
  // }

  // deleteUser(id: any) {
  //   Swal.fire({
  //     title: 'Estás seguro?',
  //     text: "No podrás revertir esta acción!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Si, eliminar!',
  //     cancelButtonText: 'cancelar',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.authService.getAllUsers2().subscribe({
  //         next: (data: any) => {
  //           let usersFinal = data.users.filter((user: any) => user.id != `${id}`)
  //           let usersNew = this.authService.usersAferDelete(usersFinal)
  //           this.authService.setUserDemo(usersNew).subscribe({
  //             next: (data: any) => {
  //               Swal.fire(
  //                 'Completado!',
  //                 'Usuario eliminado!',
  //                 'success'
  //               )
  //               this.showDBUsers()
  //             },
  //             error: (error) => {
  //               Swal.fire(
  //                 'Error!',
  //                 'NO se ha podido eliminar el usuario!',
  //                 'error'
  //               )
  //             }
  //           })
  //           this.showDBUsers()
  //         }
  //       })
  //       this.showDBUsers()

  //     }
  //   })
    
  // }



  getUserLogged() {
    const token = this.authService.getUserLogged()
    //console.log(this.authService.getUserLogged())
    this.authService.getUser(token).subscribe(user => {
      console.log(user);
    });
  }
}
