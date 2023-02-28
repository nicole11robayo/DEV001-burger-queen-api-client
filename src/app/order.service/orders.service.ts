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

  getAllOrder(status: string){
    return this.http.get(`http://localhost:3000/orders?status=${status}`)
  }

  crearOrder(item: any, nameUs: any){
    let objetoEditar = {
      userId: this.idProductNew,
      client: nameUs,
      products: [],
      status: 'pending',
      dateEntry: moment().format('YYYY-MM-DD hh:mm:ss'),
      dateProcessed: moment().format('YYYY-MM-DD hh:mm:ss'),
    };
    objetoEditar.products = item
    return objetoEditar
  }

  deleteOrder(id:any){
    return this.http.delete(`http://localhost:3000/orders/${id}`)
  }

  editarOrder(id:any,item: any ){
    return this.http.put(`http://localhost:3000/orders/${id}`, item)
  }
  
  obtenerOrden(id:any){
    return this.http.get(`http://localhost:3000/orders/${id}`)
  }

  objetoStatus(item: any, statusOrder: any){
    let objetoEditar = {
      userId: item.userId,
      client: item.client,
      products: item.products,
      status: statusOrder,
      dateEntry: item.dateEntry,
      dateProcessed: moment().format('YYYY-MM-DD hh:mm:ss'),
    };

    return objetoEditar
  }
}
