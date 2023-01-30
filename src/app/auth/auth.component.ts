import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  email!: string;
  password!: string;

  constructor(private authService: AuthService) {
   
  }

  login() {
    const userAuth = {email: this.email, password: this.password}
    this.authService.login(userAuth).subscribe( (data: any) => {
      console.log(data);
    });
    //this.router.navigateByUrl('/products')
  }
}
