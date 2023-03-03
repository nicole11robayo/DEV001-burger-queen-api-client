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
  bdTemporal: any= []

  ngOnInit(): void {
    this.getRole();
  
    
    this.getAllOrders()
    this.orderPending()
  }

  getRole() {
    this.role = this.productsService.getrole()
  }
 
  /*
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
            this.orderPending()
    
          },

        });
      }
    })
    
   
    
  }
  
  cambiarStatus(id: number, statusOrder: any){
    
    //console.log(this.bdTemporal)
    let cards = this.bdTemporal.filter((product: any) => product.id == `${id}`);
    let cards2 = this.bdTemporal.filter((product: any) => product.id != `${id}`)
    //console.log(cards);
    let statusChange = this.orderService.objetoStatus(cards[0], statusOrder);
    //console.log(statusChange);
    let orderChange = this.orderService.crearOrdenMul(cards2, statusChange)
    //console.log(orderChange);
    this.orderService.setOrderDemo(orderChange).subscribe({
      next: (data: any) => {
        Swal.fire(
          'Good job!',
          `Su orden esta ${statusOrder} `,
          'success'
        )
        this.getAllOrders()
        this.orderPending()
      }
    })
    // this.orderService.obtenerOrden(id).subscribe({
    //   next: (data: any) => {
    //       //console.log(data);
    //       this.orderService.editarOrder(id, this.orderService.objetoStatus(data, statusOrder)).subscribe({
    //         next: (datos: any) => {
    //            alert('Orden editada con exito')
    //            this.orderPending()
    //         }
    //       })
    //   },
    // })
  }

  tiempoOrders(tp1: any, tp2: any){
  //console.log(tp1, tp2) 
  const Hm1 =  moment(tp1).format('LT');
  const gira = '2023-03-02 13:22:59'
  const momentHi = moment(tp1);
  //const momentHf = moment(tp2).format('LT');
  const momentHf = moment(tp2);
  //console.log(momentHi, momentHf)
  let diferenciaEnMinutos = momentHf.diff(momentHi, 'minutes');
    let hora =  diferenciaEnMinutos/ 60;
    let min = diferenciaEnMinutos % 60
    //  Swal.fire(
    //           'Tiempo',
    //           ` ${Math.floor(hora)} horas y ${min} minutos`,
    //           'info'
    //         );
 
   console.log( ` ${Math.floor(hora)} horas y ${min} minutos`)
  }

  orderPending(){
    let item = this.bdTemporal;
    let cards = item.filter((product: any) => product.status == 'pending');
    this.orders= cards;
    this.total = cards.length;
    this.pageChangeEvent(1)
    //this.getAllOrders('pending')
    //  this.orderService.getAllOrder('pending').subscribe({
    //   next: (data: any) => {
    //     this.orders= data;
    //     this.total = data.length;
      
    //     this.pageChangeEvent(1)
    //   },
    // });
  }
 
  orderDelivering(){
    let item = this.bdTemporal;
    let cards = item.filter((product: any) => product.status == 'delivering');
    this.orders= cards;
    this.total = cards.length;
    this.pageChangeEvent(1)
    //.getAllOrders('delivering')
    // this.orderService.getAllOrder('delivering').subscribe({
    //   next: (data: any) => {
    //     this.orders= data;
    //     this.total = data.length;
       
    //     this.pageChangeEvent(1)
    //   },
    // });

  }
  
  orderCanceled(){
    let item = this.bdTemporal;
    let cards = item.filter((product: any) => product.status == 'canceled');
    this.orders= cards;
    this.total = cards.length;
    this.pageChangeEvent(1)
    //this.getAllOrders('canceled')
    // this.orderService.getAllOrder('canceled').subscribe({
    //   next: (data: any) => {
    //     this.orders= data;
    //     this.total = data.length;
      
    //     this.pageChangeEvent(1)
    //   },
    // });
  }
  
  orderDelivered(){
    let item = this.bdTemporal;
    let cards = item.filter((product: any) => product.status == 'delivered');
    this.orders= cards;
    this.total = cards.length;
    this.pageChangeEvent(1)
    //this.getAllOrders('delivered')
    // this.orderService.getAllOrder('delivered').subscribe({
    //   next: (data: any) => {
    //     this.orders= data;
    //     this.total = data.length;
     
    //     this.pageChangeEvent(1)
    //   },
    // });
  }
  
getAllOrders(){
  this.orderService.getOrderDemo().subscribe({
    next: (data: any) => {
      // let item = data.orders;
      // let cards = item.filter((product: any) => product.status == `${status}`);
      // this.orders= cards;

      this.bdTemporal = data.orders
      this.orderPending()
      //this.total = cards.length;
      //this.pageChangeEvent(1)
    }
  })
}
pageChangeEvent(event: number){
  this.p = event;
 }
}

