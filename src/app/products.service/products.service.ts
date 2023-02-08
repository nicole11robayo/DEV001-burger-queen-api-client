import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsArray: object[]=[];

  constructor(private http: HttpClient) { }

  showProducts() {
    return this.http.get("http://localhost:3000/products")
  }

  getProduct(id: number) {
    //return this.getToken()
    return this.http.get(`http://localhost:3000/products/${id}`);
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

    return new Promise ((resolve) =>{
      
        resolve(localStorage.getItem('product'))

    })
  }

}
