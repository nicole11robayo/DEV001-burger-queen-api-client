import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service/products.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { OrdersService } from 'app/order.service/orders.service';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.css']
})
export class CocinaComponent implements OnInit {

  role!: any;
  
  constructor(private productsService: ProductsService, private orderService: OrdersService) { }
 
  p: number = 1;
  total: number = 0;
  orders: any = [];

  ngOnInit(): void {
    this.getRole();
  
    this.orderPending()
  }

  getRole() {
    this.role = this.productsService.getrole()
  }
 

  deleteOrder(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.deleteOrder(id).subscribe({
          next: (data: any) => {
            Swal.fire(
              'Deleted!',
              `Your file has been deleted. ${id}`,
              'success'
            );
            this.orderPending()
    
          },
        
        });
      }
    })
    
   
    
  }
  
  cambiarStatus(id: number, statusOrder: any){
    this.orderService.obtenerOrden(id).subscribe({
      next: (data: any) => {
          //console.log(data);
          this.orderService.editarOrder(id, this.orderService.objetoStatus(data, statusOrder)).subscribe({
            next: (datos: any) => {
               alert('Orden editada con exito')
               this.orderPending()
            }
          })
      },
    })
  }

  tiempoOrders(tp1: any, tp2: any){
    const momentHi = moment(tp1);
    const momentHf = moment(tp2);
    let diferenciaEnMinutos = momentHf.diff(momentHi, 'minutes');
    let hora =  diferenciaEnMinutos/ 60;
    let min = diferenciaEnMinutos % 60
     Swal.fire(
              'Tiempo',
              ` ${Math.floor(hora)} horas y ${min} minutos`,
              'info'
            );
   console.log(diferenciaEnMinutos);
 
 
  }

  orderPending(){
     this.orderService.getAllOrder('pending').subscribe({
      next: (data: any) => {
        this.orders= data;
        this.total = data.length;
      
        this.pageChangeEvent(1)
      },
    });
  }
 
  orderDelivering(){
    this.orderService.getAllOrder('delivering').subscribe({
      next: (data: any) => {
        this.orders= data;
        this.total = data.length;
       
        this.pageChangeEvent(1)
      },
    });

  }
  
  orderCanceled(){
    this.orderService.getAllOrder('canceled').subscribe({
      next: (data: any) => {
        this.orders= data;
        this.total = data.length;
      
        this.pageChangeEvent(1)
      },
    });
  }
  
  orderDelivered(){
    this.orderService.getAllOrder('delivered').subscribe({
      next: (data: any) => {
        this.orders= data;
        this.total = data.length;
     
        this.pageChangeEvent(1)
      },
    });
  }
  

pageChangeEvent(event: number){
  this.p = event;
 }
}

