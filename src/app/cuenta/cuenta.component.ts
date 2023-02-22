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

  constructor(private productsService: ProductsService, private orderService : OrdersService) {}

 
  productsPedido: any = [];

  localArray: object[] = [];
  objetoelem: any = [];
  arrayOrder: any = [];
  total: number = 0;
  nombreCliente :any = '';
  ngOnInit() {
    this.productsService.getCliente()
    this.arrayItem();
    this.mostrarProduct();
    if(this.productsService.getCliente() != undefined){
      this.nombreCliente = this.productsService.getCliente();    
    }
    // const date = moment();
    // const ahora = date.format('YYYY-MM-DD hh:mm:ss');
    // console.log(ahora);
    // let hi = '2023-02-20 08:26:42';
    // let hf = '2023-02-20 09:32:41';
    // const momentHi = moment(hi);
    // const momentHf = moment(hf);
    // let diferenciaEnMinutos = momentHf.diff(momentHi, 'minutes');

    // console.log(diferenciaEnMinutos);

   
  }
  mostrarProduct() {
    this.productsService.showProducts2().subscribe({
      next: (data: any) => {
        data.forEach((product: any) => {
          this.productsPedido = product.pedido;
          this.total = this.productsPedido.reduce(
            (acc: any, obj: any) => acc + obj.price * obj.cant,
            0
          );
          console.log('Total: ', this.total);
        });
      },
    });
  }
  addItem(newItem: number) {
    this.arrayItem();
    this.agregarElemento(newItem);
    this.mostrarProduct();
  }

  valor1(numero: string, id: number) {
 
    this.productsService.showProducts2().subscribe({
      next: (data: any) => {
        data.forEach((datos: any) => {
          let edit: never[] = [];
          this.filter(datos.pedido, id).forEach((datos2: any) => {
            return (edit = datos2);
          });
        

          this.elementosEditados(edit, numero);
          let itemEl = this.productsService.agregarItem(
            this.elementosEditados(edit, numero),
            this.filter2(datos.pedido, id)
          );
          this.productsService.getProductItem2(itemEl).subscribe((data) => {
            console.log('cambios agregados');
            this.mostrarProduct();
          });
         
        });
      },
    });
    this.mostrarProduct();
  }

  totalPrice(precio: number) {
    let cantidadNumber = parseInt(this.valor);
    return cantidadNumber * precio;
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
  enviarDB() {
    let orderProduct: any[] =[
       
    ]
    this.productsService.setProductItem().subscribe( {
      next: (data: any) => {
        data.pedido.forEach((datos: any) => {
         
          let productos ={
            product: datos.name,
            qty : datos.cant
          }
          orderProduct.push(productos)
          
          
         })
         const dataOrder = this.orderService.crearOrder(orderProduct)
         console.log(dataOrder)
         this.crearOrden(dataOrder)
      }
     
      
    })
  

    
  }
  crearOrden(item: any) {
     this.orderService.getOrderItem(item).subscribe({
      next: (data: any) => {
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        )
      
      },
      error: (error) => {
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'error'
        )
      
      }
    })
    
  }
  arrayItem() {
    this.productsService.showProducts2().subscribe({
      next: (data: any) => {
        data.forEach((datos: any) => {
          datos.pedido.forEach((el: any) => {
            this.objetoelem.push(el.id);
          });
        });
      },
    });
  }
  agregarElemento(id: number) {
    let array3: any[] = [];
    this.productsService.showProducts2().subscribe({
      next: (data: any) => {
        if (data.length == 0) {
          this.productsService.getProductClick(id);
          this.mostrarProduct();
        } else {
          data.forEach((datos: any) => {
            if (this.objetoelem.includes(id)) {
              console.log(this.objetoelem.includes(id));
              this.mostrarProduct();
              console.log('el producto ya existe');
            } else {
              console.log('en el else');
              console.log(this.objetoelem.includes(id));
              this.productsService.getProductClick2(id, datos.pedido);
              datos.pedido.forEach((data: any) => {
                this.productsService.getProductClick2(id, data);
                this.mostrarProduct();
              });
              this.mostrarProduct();
            }
            this.mostrarProduct();
          });
          this.mostrarProduct();
        }
        this.mostrarProduct();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  eliminarElementos(id: number) {
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
        this.productsService.showProducts2().subscribe({
          next: (data: any) => {
            data.forEach((datos: any) => {
              const filter = this.filter2(datos.pedido, id);
              const pedido = this.productsService.eliminarItem(filter);
              this.productsService.getProductItem2(pedido).subscribe({
                next: () => {
                  Swal.fire(
                    'Deleted!',
                    `Your file has been deleted. ${id}`,
                    'success'
                  );
                  this.mostrarProduct();
                },
               
              });
            });
          },
        });
       
      }
    });
  }
  
   agregarUsuario() {
    Swal.fire({
        title: "Tu nombre",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        
    })
    .then(resultado => {
        if (resultado.value) {
            
            let nombre = resultado.value;
            sessionStorage.setItem('cliente', nombre );
            Swal.fire('Nombre agregado exitosamente' + nombre);
            this.productsService.getCliente();
            this.nombreCliente = this.productsService.getCliente();
        }
    });
    
  }
 
  filter(item: any, id: number) {
    let filterId = item.filter((product: any) => product.id == id);
    return filterId;
  }
  filter2(item: any, id: number) {
    let filterId = item.filter((product: any) => product.id != id);
    return filterId;
  }
}
