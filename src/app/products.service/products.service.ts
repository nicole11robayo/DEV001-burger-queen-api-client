import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'app/auth.service/auth.service';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productsArray: object[] = [];
  isMesero = false;


  constructor(private http: HttpClient ,private authService: AuthService) {}
  idProductNew =  this.authService.getToken();
 

  showProducts(type: string) {
    return this.http.get(`http://localhost:3000/products?type=${type}`);
  }
  //all los productos
  showAllProducts(){
    return this.http.get('https://mocki.io/v1/32313748-b4d4-47c9-8cc9-196b03fe0350')
 }
 getAllProducts() {
  return this.http.get('https://api.npoint.io/13831094a52f73187288');
}
  getProduct(id: number) {
    return this.http.get(`http://localhost:3000/products/${id}`);
  }
  getProductDemo(id: number) {
    return this.http.get(`https://api.npoint.io/13831094a52f73187288/products/${id}`);
  }

  setProductDemo(item: any){
    return this.http.post(`https://api.npoint.io/13831094a52f73187288`,item)
  }
  getArrayProducts() {
    return this.productsArray;
  }
  productsAferDelete(item:any){
    let orderEl : any = {
      products: 
        item
      
    }
    return orderEl
  }
  
  crearProductMul(item: any, item1: any){
    let orderEl : any = {
      products: [
        item1
      ]
    }
    item.forEach((item2: any) => {
       orderEl.products.push(item2)
    })
    return orderEl
  }

  newProduct(){

  }

  getProductClick(id: number) {
    let producto = '';
  
     //toDo codigo para Api
    this.getProduct(id).subscribe((product) => {
    let item = this.objetoNew(this.crearObjeto(product));
    console.log(item);
      this.getProductItem(item).subscribe({
        next: (data) => {
          console.log(data);
          producto = 'agregado';
        },
        error: (error) => {
          producto = 'error';
        },
      });
     });
    return producto;
  }
  getProductClickDemo(id: number){
    let producto = '';
    this.showAllProducts().subscribe({
      next: (data: any) => {
        let item1 = data.products;
        const item = this.filter(data.products, id)
        const product = this.objetoNew(this.crearObjeto(item[0]));
        
        this.getProductItemDemo(product).subscribe({
        next: (data) => {
         
          producto = 'agregado';
        },
        error: (error) => {
          producto = 'error';
        },
      });
      }
    })
   
  }
  getProductClickDemo2(id: number,  item: any){
    let producto = '';
    this.showAllProducts().subscribe({
      next: (data: any) => {
        let item1 = data.products;
        const item2 = this.filter(data.products, id);
        //console.log(item);
        let item3 = this.agregarItem(this.crearObjeto(item2[0]),item);
        this.getProductItemDemo(item3).subscribe({
          next: (data) => {
           
            producto = 'agregado';
          },
          error: (error) => {
            producto = 'error';
          },
        });

      }
    })
  }
  filter(item: any, id: number) {
    let filterId = item.filter((product: any) => product.id == id);
    return filterId;
  }
  getProductClick2(id: number, item: any) {
    
    let producto = '';
    this.getProduct(id).subscribe((product) => {
      let item2 = this.agregarItem(this.crearObjeto(product), item);
      this.getProductItem2(item2).subscribe({
        next: (data) => {
          producto = 'agregado';
        },
        error: (error) => {
          producto = 'error';
        },
      });
      //console.log(item2)
    });
    return producto;
  }
  objetoNew(item: any) {
    let objetoEditar = {
      id: this.idProductNew,
     
      pedido: [item]
    };
    return objetoEditar;
  }
  agregarItem(item: any, item2: any) {
    let objetoEditar = {
      id: this.idProductNew,
      
      pedido: [item]
    };
    objetoEditar.pedido.push();
    item2.forEach((item: any) => {
      objetoEditar.pedido.push(item);
    });

    return objetoEditar;
  }

  eliminarItem(item: any) {
    let objetoEditar = {
      id: this.idProductNew,
      nameCliente :this.getCliente(),
      pedido: []
    };
    objetoEditar.pedido = item

    return objetoEditar;
  }
  getProductItem2(item: any): Observable<any> {
    return this.http.put(`http://localhost:3000/productsTemporal/${this.idProductNew}`, item);
  }
  getProductItem(item: any): Observable<any> {
    return this.http.post('http://localhost:3000/productsTemporal', item);
    
  }
  getProductItemDemo(item: any) {
    return this.http.post('https://api.npoint.io/923ad69ed7baabe68197 ',item)
  }
  setProductItem(): Observable<any> {
    return this.http.get(`http://localhost:3000/productsTemporal/${this.idProductNew}`, );
    
  }

  //optener todos los productos
  setApiLocal(){
    return this.http.get('https://mocki.io/v1/32313748-b4d4-47c9-8cc9-196b03fe0350')
  }
  crearObjeto(item: any) {
    
    let objetoNuevo = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      type: item.type,
      dateEntry: item.dateEntry,
      cant: 1,
    };

    return objetoNuevo;
  }

  showProducts2() {
    return this.http.get('http://localhost:3000/productsTemporal');
  }
  //products Temporal
  showProductsItem(){
    return this.http.get('https://api.npoint.io/923ad69ed7baabe68197')
  }

  deleteAll() {
    return this.http.delete(`http://localhost:3000/productsTemporal/${this.idProductNew}`);
  }

  addItemNew(id: number) {}

  getrole() {
    return sessionStorage.getItem('role') != null
      ? sessionStorage.getItem('role')?.toString()
      : '';
  }
  getCliente() {
    return sessionStorage.getItem('cliente') != null
      ? sessionStorage.getItem('cliente')?.toString()
      : '';
  }
  isMeseroRole() {
    if (this.getrole() === 'mesero') {
      this.isMesero = true;
    }

    return this.isMesero;
  }
}
