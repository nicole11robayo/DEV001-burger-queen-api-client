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

   getAllUsers(){
    return this.http.get('https://mocki.io/v1/e33dd6a6-dc7a-4b0a-a5c7-544ba6d0ff31')
   }

   showUsersJson(){
    return this.http.get(`http://localhost:3004/users`);
   }

   newUserJson(item:any){
    return this.http.post(`http://localhost:3004/users`, item);
  }

  editUserJson(id:any, item:any){
    return this.http.put(`http://localhost:3004/users/${id}`, item);
  }


   deleteUserJson(id:any){
    return this.http.delete(`http://localhost:3004/users/${id}`);
   }

   getAllUsers2(){
    return this.http.get('https://api.npoint.io/fb087e778cabace91792')
   }

   crearUserMul(item: any, item1: any){
    let orderEl : any = {
      users: [
        item1
      ]
    }
    item.forEach((item2: any) => {
       orderEl.users.push(item2)
    })
    return orderEl
  }

  usersAferDelete(item:any){
    let orderEl : any = {
      users: 
        item
      
    }
    return orderEl
  }

  setUserDemo(item: any){
    return this.http.post(`https://api.npoint.io/fb087e778cabace91792`,item)
  }
   
}
