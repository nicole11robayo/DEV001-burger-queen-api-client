import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productsArray: object [] = [];
  productsArray2: any = {};
  isMesero = false;
  isProduct = false;
  constructor(private http: HttpClient) {}

  showProducts() {
    return this.http.get('http://localhost:3000/products');
  }

  getProduct(id: number) {
    return this.http.get(`http://localhost:3000/products/${id}`);
  }

  getArrayProducts() {
    return this.productsArray;
  }

  getProductClick(id: number) {
    return this.getProduct(id).subscribe((product) => {


      this.crearObjeto(product)
    });

}

getProductItem() {
    return JSON.parse(localStorage.getItem('product')!);
    //localStorage.getItem('product')!=null?localStorage.getItem('product')?.toString():''
}
//item: object[]
setProductItem(item: object[]) {
   return localStorage.setItem('product', JSON.stringify(item));
}

crearObjeto(item:any){
  let objetoNuevo = {
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    type : item.type,
    dateEntry: item.dateEntry,
    cant : 1
  };
  this.productsArray2 = objetoNuevo
  this.productsArray.push(objetoNuevo);
  this.addProduct(objetoNuevo).subscribe({
    next:(data: any) => {this.isProduct = true;},
    error: (error) => {this.isProduct = false;}
  })



  this.setProductItem(this.productsArray);
  //console.log(objetoNuevo);
  return objetoNuevo
}
addProduct(item: any) {
 return this.http.post("http://localhost:3001/orders",item)
}
isitemadd(){
 
 
  return this.isProduct = true;
}
addItemNew(id: number){
  let  isAdd = false;
  for(let x in this.productsArray) {
    isAdd = this.itemP(this.productsArray[x], id)
  }

  return isAdd
}

itemP(item: any, id : number){
  let  isAdd = false;
  if(item.id == id){
    isAdd = true;}
  else{
      isAdd = false;
  }
  return isAdd
}
  getrole() {
    return sessionStorage.getItem('role') != null
      ? sessionStorage.getItem('role')?.toString()
      : '';
  }
  isMeseroRole() {
    if (this.getrole() === 'mesero') {
      this.isMesero = true;
    }

    return this.isMesero;
  }
}
