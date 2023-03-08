import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'app/products.service/products.service';
import Swal from 'sweetalert2';
import { AuthService } from 'app/auth.service/auth.service';

@Component({
  selector: 'app-modal-users',
  templateUrl: './modal-users.component.html',
  styleUrls: ['./modal-users.component.css']
})
export class ModalUsersComponent implements OnInit {
  usersBefore!: any;
  editData: any;
  actionButton: string = 'save';

  Reactiveform = new FormGroup({
    id: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    rol: new FormControl("", Validators.required),

  });



  constructor(private productsService: ProductsService, private authService: AuthService, public dialogref: MatDialogRef<ModalUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    //this.authService.showUsersJson().subscribe(data => this.usersBefore = data)
    if (this.data.empcode != null && this.data.empcode != '') {
      this.editDataForm(this.data.empcode);
    }
  }

  saveUser() {
    if (this.Reactiveform.valid) {
      this.authService.newUserJson(this.Reactiveform.value).subscribe({
        next: (data: any) => {
          this.dialogref.close('save');
          Swal.fire(
            'Completado!',
            'Usuario agregado con éxito!',
            'success'
          )
        },
        error: (error) => {
          Swal.fire(
            'Error!',
            'No se ha podido agregar el usuario!',
            'error'
          )

        }
      })
      this.dialogref.close('save');
    }
  }

  editDataForm(id: any) {
    this.actionButton = 'editar'
    this.authService.showUsersJson().subscribe({
      next: (data: any) => {
        let userEdit = data.filter((user: any) => user.id == `${id}`)
        //let productsKeep = data.products.filter((product: any) => product.id != `${id}`)
        this.editData = userEdit[0]
        console.log(this.editData)
        this.Reactiveform.setValue({
          id: this.editData.id, email: this.editData.email, password: this.editData.password,
          rol: this.editData.rol
        })
      }
    })
    this.editData = ''
  }

  editUser() {
    this.actionButton = 'editar'
    if (this.Reactiveform.valid) {
      this.authService.editUserJson(this.Reactiveform.value.id, this.Reactiveform.value).subscribe({
        next: (data: any) => {
          this.dialogref.close('editar');
          Swal.fire(
            'Completado!',
            'Usuario editado con éxito!',
            'success'
          )
          this.dialogref.close('editar');
        },
        error: (error) => {
          Swal.fire(
            'Error!',
            'No se ha podido editar el usuario!',
            'error'
          )
        }
      })
      this.dialogref.close('editar');
    }
  }

  // APIIIII ONLINE
  // ngOnInit() {
  //   this.authService.getAllUsers2().subscribe(data => this.usersBefore = data)
  //   if (this.data.empcode != null && this.data.empcode != '') {
  //     this.editDataForm(this.data.empcode);
  //   }
  // }

  // saveUser() {
  //   if (this.Reactiveform.valid) {
  //     console.log(this.Reactiveform.value)
  //     console.log(this.usersBefore)
  //     let usersNew = this.authService.crearUserMul(this.usersBefore.users, this.Reactiveform.value)
  //     this.authService.setUserDemo(usersNew).subscribe({
  //       next: (data: any) => {
  //         this.dialogref.close('save');
  //         Swal.fire(
  //           'Completado!',
  //           'Usuario agregado con éxito!',
  //           'success'
  //         )
  //       },
  //       error: (error) => {
  //         Swal.fire(
  //           'Error!',
  //           'No se ha podido agregar el usuario!',
  //           'error'
  //         )

  //       }
  //     })
  //     this.dialogref.close('save');
  //   }
  // }

  // editDataForm(id: any) {
  //   this.actionButton = 'editar'
  //   this.authService.getAllUsers2().subscribe({
  //     next: (data: any) => {
  //       let userEdit = data.users.filter((user: any) => user.id == `${id}`)
  //       //let productsKeep = data.products.filter((product: any) => product.id != `${id}`)
  //       this.editData = userEdit[0]
  //       console.log(this.editData)
  //       this.Reactiveform.setValue({
  //         id: this.editData.id, email: this.editData.email, password: this.editData.password,
  //         rol: this.editData.rol
  //       })
  //     }
  //   })
  //   this.editData = ''
  // }

  // editUser() {
  //   this.actionButton = 'editar'
  //   this.authService.getAllUsers2().subscribe({
  //     next: (data: any) => {
  //       //let productEdit = data.products.filter((product: any) => product.id == `${id}`)
  //       let usersKeep = data.users.filter((product: any) => product.id != this.Reactiveform.value.id)

  //       if (this.Reactiveform.valid) {
  //         let usersNew = this.authService.crearUserMul(usersKeep, this.Reactiveform.value)
  //         console.log(usersNew)
  //         this.authService.setUserDemo(usersNew).subscribe({
  //           next: (data: any) => {
  //             this.dialogref.close('editar');
  //             Swal.fire(
  //               'Completado!',
  //               'Usuario eeditado con éxito!',
  //               'success'
  //             )
  //           },
  //           error: (error) => {
  //             Swal.fire(
  //               'Error!',
  //               'No se ha podido editar el usuario!',
  //               'error'
  //             )
  //           }
  //         })
  //         this.dialogref.close('editar');
  //       }
  //     }
  //   })
  // }


}

