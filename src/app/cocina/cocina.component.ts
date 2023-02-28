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
    this.orderService.getAllOrder().subscribe({
      next: (data: any) => {
        this.orders= data;

      },
    });
  }
  
  

  showOrdersPending() {
    this.orderService.getAllOrder().subscribe((data: any) => {

      let pending = data.filter((order: any) => order.status === "pending")

      this.orders = pending;
    });

  }

  showOrdersDelivering() {
    this.orderService.getAllOrder().subscribe((data: any) => {

      let delivering = data.filter((order: any) => order.status === "delivering")

      this.orders = delivering;
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

}
