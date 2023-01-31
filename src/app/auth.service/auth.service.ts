import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http: HttpClient) {}
  login(user: any ): Observable <any>{
    return this.http.post("http://localhost:3004/login", user);
  }
  // login(user: any ): Observable <any> {
  //  http://localhost:3000/auth ;
  // }
}
