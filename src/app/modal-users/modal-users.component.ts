import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'app/products.service/products.service';
import Swal from 'sweetalert2';
import { AuthService } from 'app/auth.service/auth.service';

@Component({
  selector: 'app-modal-users',
  templateUrl: './modal-users.component.html',
  styleUrls: ['./modal-users.component.css']
})
export class ModalUsersComponent implements OnInit {
  usersBefore!:any;

  Reactiveform = new FormGroup({
    id: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    rol: new FormControl("", Validators.required),

  });

  

  constructor(private productsService: ProductsService, private authService: AuthService) { }

  ngOnInit(){
    this.authService.getAllUsers2().subscribe(data=> this.usersBefore = data)


  }
  


  SaveEmployee() {
    if (this.Reactiveform.valid) {
      console.log(this.Reactiveform.value)

      console.log(this.usersBefore)
      let usersNew= this.authService.crearUserMul(this.usersBefore.users, this.Reactiveform.value)
      this.authService.setUserDemo(usersNew).subscribe({
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
      
      
    }
  }

}

