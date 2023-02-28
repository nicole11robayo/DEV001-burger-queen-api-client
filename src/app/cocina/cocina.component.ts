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
  p: number = 1;
  total: number = 0;

  constructor(private productsService: ProductsService, private orderService: OrdersService) { }

  orders: any = [];

  ngOnInit(): void {
    this.getRole();
    this.mostrarOrders();
    //this.showOrdersPending();
  }

  getRole() {
    this.role = this.productsService.getrole()
  }
  /*
  mostrarProduct() {
    this.orderService.getAllOrder().subscribe({
      next: (data: any) => {
        data.forEach((product: any) => {
          this.productsOrder = product.products;
          console.log(this.productsOrder)
        });
      },
    });
  }
  */
  
  mostrarOrders() {
    this.orderService.getOrders(this.p).subscribe({
      next: (data: any) => {
        this.orders= data;
        this.total=data.length

      },
    });
  }
  pageChangeEvent(event: number){
    this.p = event;
    this.mostrarOrders();
    //this.showOrdersPending();
}
  

  showOrdersPending() {
    this.orderService.getAllOrder().subscribe((data: any) => {

      let pending = data.filter((order: any) => order.status === "pending")

      this.orders = pending;
      //this.total= pending.length
    });

  }

  showOrdersDelivering() {
    this.orderService.getAllOrder().subscribe((data: any) => {

      let delivering = data.filter((order: any) => order.status === "delivering")

      this.orders = delivering;
    });

  }

  showOrdersDelivered() {
    this.orderService.getAllOrder().subscribe((data: any) => {

      let delivered = data.filter((order: any) => order.status === "delivered")

      this.orders = delivered;
    });

  }
  /*
  finishOrder(id: any) {

    this.orderService.getOrder(id).subscribe({
      next: (data: any) => {
        data.status = "delivering";
        console.log('cambiado')

        this.showOrdersPending()

      },

    });

    this.showOrdersPending()

  }
*/
  deleteOrder(id: any) {
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
            this.mostrarOrders()
            //this.showOrdersPending()

          },

        });
      }
    })
    this.mostrarOrders()
    //this.showOrdersPending()

  }
  
  cambiarStatus(id: number, statusOrder: any){
    this.orderService.obtenerOrden(id).subscribe({
      next: (data: any) => {
          //console.log(data);
          this.orderService.editarOrder(id, this.orderService.objetoStatus(data, statusOrder)).subscribe({
            next: (datos: any) => {
               alert('Orden editada con exito')
               this.mostrarOrders()
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
}
