import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService, public router: Router) {
   
  }

  deleteToken(){
    this.authService.deleteToken();
    this.router.navigateByUrl('/home');

  }
}
