import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service/auth.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  constructor(private authService: AuthService ){}
  ngOnInit() {
    this.getUserLogged();
   
  }
  getUserLogged() {
    let isLoggedIn = this.authService.isAuthenticated();
    if(isLoggedIn){
      const token = this.authService.getUserLogged()
      //console.log(this.authService.getUserLogged())
      this.authService.getUser(token).subscribe(user => {
        console.log(user);
        
      });
    }
}
}
