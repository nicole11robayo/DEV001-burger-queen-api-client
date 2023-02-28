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
 
  getProduct(id: number) {
    return this.http.get(`http://localhost:3000/products/${id}`);
  }
  getArrayProducts() {
    return this.productsArray;
  }

  getProductClick(id: number) {
    let producto = '';
   
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
      nameCliente :this.getCliente(),
      pedido: [item]
    };
    return objetoEditar;
  }
  agregarItem(item: any, item2: any) {
    let objetoEditar = {
      id: this.idProductNew,
      nameCliente :this.getCliente(),
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
  setProductItem(): Observable<any> {
    return this.http.get(`http://localhost:3000/productsTemporal/${this.idProductNew}`, );
    
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
