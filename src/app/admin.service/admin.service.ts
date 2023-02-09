import { Injectable } from '@angular/core';
import { AuthService } from 'app/auth.service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  isAdmin: boolean = false;
  constructor(private authService: AuthService,) { }
  
  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  isAdminRole() {
    if(this.getrole() === 'admin'){
      this.isAdmin = true;
    }

    return this.isAdmin;
  }
}
