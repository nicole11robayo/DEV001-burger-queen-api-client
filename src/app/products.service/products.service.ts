import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  objetoEditar = {
    id: 1,
    pedido: [
     
  ]}
  productsArray: object [] = [];
  arrayNumber = this.array();
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
isMessage(sms: string) {
  return sms
}
  getArrayProducts() {
    return this.productsArray;
  }
  crearObjetoNuevo(id: number){
  
    // this.showProducts2().subscribe({
    //   next: (data: any) =>{
        
    //     data.forEach((datos: any)=>{
         
    //       if(datos.pedido.length == 0){
    //         this.getProductClick(id);
    //         console.log(this.productsArray2)
    //       }else{
    //         datos.pedido.forEach((el: any)=>{
            
    //           let array = []
    //           array.push(el.id)
    //           if(array.includes(id)){
    //             console.log('el producto ya existe')
    //           }
    //           else{
    //             console.log('el elemento no existe')
    //           }
              
    //         })
    //       }
    //        datos.pedido
    //     })
    //   },
    //   error: (error) => {
    //     console.log(error)
    //   } 
      
    // })
    
  }
  getProductClick(id: number) {
    let producto = ''
    this.getProduct(id).subscribe((product) => {
      let item = this.objetoNew(this.crearObjeto(product)) 
      this.getProductItem2(item).subscribe({
       next : (data) => {producto = 'agregado'},
       error:(error)=>{producto = 'error'}
      })
  });
  return producto
}
getProductClick2(id: number,item: any){
  let producto = ''
  this.getProduct(id).subscribe((product) => {
    let item2 = this.agregarItem(this.crearObjeto(product), item)
    this.getProductItem2(item2).subscribe({
      next : (data) => {producto = 'agregado'},
      error:(error)=>{producto = 'error'}
     })
     console.log(item2)
  })
 return producto
}
objetoNew(item : any) {
 let objetoEditar = {
    id: 1,
    pedido: [
     item
  ]}
  return objetoEditar
}
agregarItem(item : any, item2: any) {

  let objetoEditar = {
    id: 1,
    pedido: [

     item,
     item2
  ]}
  return objetoEditar
}
getProductItem2(item: any): Observable <any>{
  return this.http.put('http://localhost:3000/productsTemporal/1', item);
}
getProductItem() {
    return JSON.parse(localStorage.getItem('product')!);
    //localStorage.getItem('product')!=null?localStorage.getItem('product')?.toString():''
}

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
  
  return objetoNuevo
}


addProduct(item: any) {
 return this.http.post("http://localhost:3000/productsTemporal",item)
}
isitemadd(){
 return this.isProduct = true;
}
showProducts2() {
  return this.http.get('http://localhost:3000/productsTemporal');
}

deleteAll(id: number){
  return this.http.delete(`http://localhost:3000/productsTemporal/${id}`)
}

addItemNew(id: number){
  
}


array(){
  let num : any = []
 this.showProducts2().subscribe({
  next: (item: any) =>{
    item.forEach((item: any) =>{
      //console.log(item.id)
      num.push(item.id);
      this.arrayNumber.push(item.id);
    })
  }
 })
 return num;
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
