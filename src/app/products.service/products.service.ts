import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsArray: object[]=[];
  isMesero = false;
  constructor(private http: HttpClient) { }

  showProducts() {
    return this.http.get("http://localhost:3000/products")
  }

  getProduct(id: number) {
    //return this.getToken()
    return this.http.get(`http://localhost:3000/products/${id}`);
  }

  getArrayProducts(){
    return this.productsArray;
  }

  getProductClick(id:number) {
    this.getProduct(id).subscribe(product => {
      this.productsArray.push(product)
      this.setProductItem(this.productsArray)
    });
    return id;
  }

  setProductItem(item: object[]){

    localStorage.setItem('product', JSON.stringify(item))
  }

  getProductItem(){
    
    return localStorage.getItem('product')!=null?localStorage.getItem('product')?.toString():''
  }
  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  isMeseroRole() {
    if(this.getrole() === 'mesero'){
      this.isMesero = true;
    }

    return this.isMesero;
  }
}
