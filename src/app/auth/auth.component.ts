import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service/auth.service';
import {ToastrService} from 'ngx-toastr'


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  email!: string;
  password!: string;
  errorMessage!: string;

  constructor(private authService: AuthService, public router: Router, private toastr: ToastrService) {
   
  }

  login() {
    const userAuth = {email: this.email, password: this.password}
    this.authService.login(userAuth).subscribe({

    next: (data: any) => {
      if(data.user.rol === "mesero"){
        console.log(data.accessToken);
        this.authService.setToken(data.accessToken);

        this.router.navigateByUrl('/products');

      }
    },
    error: (error) => {
      this.errorMessage = JSON.stringify(error.error);
      
      //(').toast({ delay: 2000 });
      /*
      this.toastr.error('A ocurrido un error!', JSON.stringify(error.error), {
        positionClass: 'toast-top-right'
      })
      */
   }
  });
    //this.router.navigateByUrl('/products')
  }
}
