import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'app/auth.service/auth.service';
import { ProductsService } from 'app/products.service/products.service';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
 

  constructor(private http: HttpClient , private authService: AuthService,private productsService: ProductsService ) { }
  idProductNew =  this.authService.getToken();
  nombreUs = this.productsService.getCliente();
  getOrderItem(item: any): Observable<any> {
    return this.http.post('http://localhost:3000/orders', item);
    
  }

  crearOrder(item: any){
    let objetoEditar = {
      userId: this.idProductNew,
      client: this.nombreUs,
      products: [],
      status: 'pending',
      dateEntry: moment().format('YYYY-MM-DD hh:mm:ss'),
      dateProcessed: moment().format('YYYY-MM-DD hh:mm:ss'),
    };
    objetoEditar.products = item
    return objetoEditar
  }
}
