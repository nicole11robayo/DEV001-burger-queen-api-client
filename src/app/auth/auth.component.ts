import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  loginForm!: FormGroup;
  
  constructor(private authService: AuthService, public router: Router,private formBuilder: FormBuilder ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if(this.loginForm.valid){
      const userAuth = this.loginForm.value
      this.authService.login(userAuth).subscribe({
      next: (data: any) => {
        if(data.user.rol === "mesero"){
         this.authService.setToken(data.user.id)
         this.authService.setToken(data.accessToken);
         this.router.navigateByUrl('/products');
        }
        
       
      },
      error: (error) => {
         alert(JSON.stringify(error.error))
      }
    })
     
    }else{
      let userLogged = 'invalid_form';
      alert(userLogged)
    }
    
   
  }
}
