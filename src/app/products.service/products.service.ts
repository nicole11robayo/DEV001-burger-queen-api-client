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


  constructor(private http: HttpClient, private authService: AuthService) { }
  idProductNew = this.authService.getToken();

  showProducts(type: string) {
    return this.http.get(`https://my-json-server.typicode.com/khammylv/bdProducts/products?type=${type}`);
  }

  getProduct(id: number) {
    return this.http.get(`https://my-json-server.typicode.com/khammylv/bdProducts/products/${id}`);
  }

  showProductsJson() {
    return this.http.get(`http://localhost:3000/products`);
  }

  getProductJson(id: number) {
    return this.http.get(`http://localhost:3000/products/${id}`);
  }

  newProductJson(item: any) {
    return this.http.post(`http://localhost:3000/products`, item);
  }

  editProductJson(id: any, item: any) {
    return this.http.put(`http://localhost:3000/products/${id}`, item);
  }

  deleteProductJson(id: any) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getAllProducts() {
    return this.http.get('https://api.npoint.io/13831094a52f73187288');
  }

  getProductDemo(id: number) {
    return this.http.get(`https://api.npoint.io/13831094a52f73187288/products/${id}`);
  }

  setProductDemo(item: any) {
    return this.http.post(`https://api.npoint.io/13831094a52f73187288`, item)
  }

  productsAferDelete(item: any) {
    let orderEl: any = {
      products:
        item

    }
    return orderEl
  }

  crearProductMul(item: any, item1: any) {
    let orderEl: any = {
      products: [
        item1
      ]
    }
    item.forEach((item2: any) => {
      orderEl.products.push(item2)
    })
    return orderEl
  }


  elementosEditados(item: any, numero: string) {
    let objetoNuevo = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      type: item.type,
      dateEntry: item.dateEntry,
      cant: numero,
    };

    return objetoNuevo;
  }

  filter(item: any, id: number) {
    let filterId = item.filter((product: any) => product.id == id);
    return filterId;
  }
  filter2(item: any, id: number) {
    let filterId = item.filter((product: any) => product.id != id);
    return filterId;
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
      pedido: []
    };
    objetoEditar.pedido = item

    return objetoEditar;
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
