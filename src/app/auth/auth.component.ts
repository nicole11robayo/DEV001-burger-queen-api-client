import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  loginForm: FormGroup = new FormGroup({})
  elemento :any = document.getElementById('password');
  
  constructor(private authService: AuthService, public router: Router,private formBuilder: FormBuilder ) {
   
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    //console.log(this.loginForm.value)
    if(this.loginForm.valid){
      const userAuth = this.loginForm.value
      this.authService.login(userAuth).subscribe({
      next: (data: any) => {
        if(data.user.rol === "mesero"){
         this.authService.setToken(data.user.id)
         //this.authService.setToken(data.accessToken);
         this.router.navigateByUrl('/products');
        }
        
       
      },
      error: (error) => {
         alert(JSON.stringify(error.error))
      }
    })
     
    }else{
     
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid Form!',
        //text: 'Something went wrong!',
      })
    }
    
   
  }
 
  togglePasswordMode(input: any): any{
    input.type = input.type === 'password' ? 'text' : 'password';
     //console.log(this.elemento.type)
  }
 
}

