import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductsService } from '../products.service/products.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { OrdersService } from 'app/order.service/orders.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css'],
})
export class CuentaComponent implements OnInit {
  valor: string = '';
  id: string = '';

  constructor(
    private productsService: ProductsService,
    private orderService: OrdersService
  ) {}

  productsPedido: any = [];

  localArray: object[] = [];
  objetoelem: any = [];
  objetoelemDemo: any = [];
  arrayOrder: any = [];
  total: number = 0;
  nombreCliente: any = '';
  ngOnInit() {
    this.productsService.getCliente();
    this.arrayItem();
    this.mostrarProduct();

    if (this.productsService.getCliente() != undefined) {
      this.nombreCliente = this.productsService.getCliente();
    }
    localStorage.setItem('product', JSON.stringify(this.objetoelemDemo));
    let local = JSON.parse(sessionStorage.getItem('products')!);
   
  }
  mostrarProduct() {
    let local = JSON.parse(sessionStorage.getItem('products')!);
    this.productsPedido = local.pedido;
    this.total = this.productsPedido.reduce(
      (acc: any, obj: any) => acc + obj.price * obj.cant,
      0
    );
 
  }
  addItem(newItem: number) {
    this.agregarElemento(newItem);
    this.mostrarProduct();
    this.arrayItem();
  }
  valorMas(numero: string, id: number) {
    let local = JSON.parse(sessionStorage.getItem('products')!);
    let edit: never[] = [];
    this.productsService.filter(local.pedido, id).forEach((datos2: any) => {
      return (edit = datos2);
    });
    this.productsService.elementosEditados(edit, numero);
    let itemEl = this.productsService.agregarItem(
      this.productsService.elementosEditados(edit, numero),
      this.productsService.filter2(local.pedido, id)
    );

    sessionStorage.setItem('products', JSON.stringify(itemEl));
    this.mostrarProduct();
  }

  totalPrice(precio: number) {
    let cantidadNumber = parseInt(this.valor);
    return cantidadNumber * precio;
  }

 
  enviarDbDemo() {
    if (this.nombreCliente === '') {
      Swal.fire('Bad job!', 'agrega un nombre!', 'warning');
    } else {
      let orderProduct: any[] = [];
      let data = JSON.parse(sessionStorage.getItem('products')!);
      data.pedido.forEach((product: any) => {
        let productos = {
          product: product.name,
          qty: product.cant,
        };

        orderProduct.push(productos);
      });
      const dataOrder = this.orderService.crearOrder(
        orderProduct,
        this.nombreCliente
      );

      let orderEl: any = {
        orders: [dataOrder],
      };
      console.log(orderEl);
      this.orderService.getOrderDemo().subscribe({
        next: (data: any) => {
          if (data.orders === undefined) {
            this.crearOrderDemo(orderEl);

            this.productsPedido = [];
            this.nombreCliente = '';
            this.total = 0;
            this.objetoelem = [];
            this.objetoelemDemo = [];
            sessionStorage.removeItem('cliente');
            sessionStorage.removeItem('products');
          } else {
            const ordenMul = this.crearOrdenMul(data.orders, dataOrder);
            this.crearOrderDemo(ordenMul);
            this.productsPedido = [];
            this.nombreCliente = '';
            this.total = 0;
            this.objetoelem = [];
            this.objetoelemDemo = [];
            sessionStorage.removeItem('cliente');
            sessionStorage.removeItem('products');
          }
        },
      });
    }
  }
  crearOrdenMul(item: any, item1: any) {
    let orderEl: any = {
      orders: [item1],
    };
    item.forEach((item2: any) => {
      orderEl.orders.push(item2);
    });
    return orderEl;
  }
  crearOrden(item: any) {
    this.orderService.getOrderItem(item).subscribe({
      next: (data: any) => {
        Swal.fire('Pedido enviado con éxito!', 'Podrás ver el estado de tu orden en pedidos!', 'success');
      },
      error: (error) => {
        Swal.fire('Error!', 'No se ha podido enviar tu orden!', 'error');
      },
    });
  }

  crearOrderDemo(item: any) {
    this.orderService.setOrderDemo(item).subscribe({
      next: (data: any) => {
        Swal.fire('Pedido enviado con éxito!', 'Podrás ver el estado de tu orden en pedidos!', 'success');
      },
      error: (error) => {
        Swal.fire('Error!', 'No se ha podido enviar tu orden!', 'error');
      },
    });
  }
  arrayItem() {
    let local = JSON.parse(sessionStorage.getItem('products')!);
    local.pedido.forEach((item: any) => {
      this.objetoelem.push(item.id);
    });
  }

  agregarElemento(id: number) {
    let local = JSON.parse(sessionStorage.getItem('products')!);
    this.productsService.getProduct(id).subscribe({
      next: (data: any) => {
        if (local === null) {
          const product = this.productsService.objetoNew(
            this.productsService.crearObjeto(data)
          );
          console.log(product);
          sessionStorage.setItem('products', JSON.stringify(product));
          this.mostrarProduct();
        } else {
          if (this.objetoelem.includes(id)) {
            Swal.fire('Error!', 'El producto ya existe', 'error');
          }else{
            const item3 = local.pedido;
            let item2 = this.productsService.agregarItem(
              this.productsService.crearObjeto(data),
              item3
            );
            console.log(item2);
            sessionStorage.setItem('products', JSON.stringify(item2));
            this.mostrarProduct();
          }
         
        }
      },
    });
  }

 
  eliminarElDemo(id: number) {
    Swal.fire({
      title: 'Estás seguro?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        let data = JSON.parse(sessionStorage.getItem('products')!);
        const filter = this.productsService.filter2(data.pedido, id);
        const pedido = this.productsService.eliminarItem(filter);
        sessionStorage.setItem('products', JSON.stringify(pedido));
        this.mostrarProduct();

        Swal.fire('Eliminado!', `Producto eliminado`, 'success');
        this.mostrarProduct();
        this.objetoelem = [];
        this.objetoelemDemo = [];
        this.arrayItem();
      }
    });
  }
  agregarUsuario() {
    Swal.fire({
      title: 'Nombre cliente',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => {
      if (resultado.value) {
        let nombre = resultado.value;
        sessionStorage.setItem('cliente', nombre);
        this.productsService.getCliente();
        this.nombreCliente = this.productsService.getCliente();
      }
    });
  }
}
