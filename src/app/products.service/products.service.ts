import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsArray: object[]=[];
  isMesero = false;
  cantidad:any;
  constructor(private http: HttpClient) { }
  
  getInputValue(inputValue:string){
    this.cantidad= inputValue;
    console.log(this.cantidad);
  }
  showProducts() {
    return this.http.get("http://localhost:3000/products")
  }

  getProduct(id: number) {
    //return this.getToken()
    return this.http.get(`http://localhost:3000/products/${id}`);
  }

  
  getProductClick(id:number) {
    this.getProduct(id).subscribe(product => {
      this.productsArray.push(product);
      this.setProductItem(this.productsArray);
      let counterProduct: number =1;
    });
    return id;
  }

  setProductItem(item: object[]){

    return localStorage.setItem('product', JSON.stringify(item))
  }

  getProductItem(){

    return localStorage.getItem('product');


    //return localStorage.getItem('product')!=null?localStorage.getItem('product'):;
  }

  getArrayProducts(){
    return this.productsArray;
  }

  
  /*
  getProductItem(){

    return new Promise ((resolve) =>{
      
        resolve(localStorage.getItem('product'))

    })
  }
  */
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
