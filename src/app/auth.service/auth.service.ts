import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient, private cookies: CookieService) {}
  login(user: any ){
    return this.http.post("http://localhost:3004/login", user);
  }
  setToken(token: string) {
    this.cookies.set("token", token);
    //console.log(token);
  }
  getToken() {
    return this.cookies.get("token");
  }
  deleteToken() {
    return this.cookies.delete("token");
  }
  getUser(token : string) {
    const token1 = token
    //return this.getToken()
     return this.http.get(`http://localhost:3004/users/${token1}`);
   }
   getUserLogged() {
     const token = this.getToken();
     return token
     // Aquí iría el endpoint para devolver el usuario para un token
   }

   
}
