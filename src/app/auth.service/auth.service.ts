import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http: HttpClient, private cookies: CookieService) {}
  login(user: any ): Observable <any>{
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
  // login(user: any ): Observable <any> {
  //  http://localhost:3000/auth ;
  // }
}
