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
    console.log( this.productsService.getCliente());
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
    this.productsService.showProductsItem().subscribe({
      next: (data: any) => {
        this.productsPedido = data.pedido;
               this.total = this.productsPedido.reduce(
            (acc: any, obj: any) => acc + obj.price * obj.cant,
            0
          );
         
      }
    })


    //toDo codigo para API
    // this.productsService.showProducts2().subscribe({
    //   next: (data: any) => {
    //     data.forEach((product: any) => {
    //       this.productsPedido = product.pedido;
    //       this.total = this.productsPedido.reduce(
    //         (acc: any, obj: any) => acc + obj.price * obj.cant,
    //         0
    //       );
    //       console.log('Total: ', this.total);
    //     });
    //   },
    // });
  }
  addItem(newItem: number) {
   
    this.arrayItem();
    this.agregarElemento(newItem);
    this.mostrarProduct();
  }
  valorMas(numero: string, id: number) {
   
   
     this.productsService.showProductsItem().subscribe({
      next: (data: any) => {
        let edit: never[] = [];
        console.log(data.pedido);
        this.filter(data.pedido, id).forEach((datos2: any) => {
          return (edit = datos2);
        });
        this.elementosEditados(edit, numero);
        let itemEl = this.productsService.agregarItem(
          this.elementosEditados(edit, numero),
          this.filter2(data.pedido, id)
        );
       this.productsService.getProductItemDemo(itemEl).subscribe((data) => {
        console.log('cambios agregados');
        this.mostrarProduct();
      ;})
      }
     })  
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
    if(this.nombreCliente === ''){
      Swal.fire(
        'Error!',
        'Agrega el nombre de tu cliente',
        'warning'
      )
      
    }else{
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
           const dataOrder = this.orderService.crearOrder(orderProduct, this.nombreCliente)
           //console.log(dataOrder)
           
           this.crearOrden(dataOrder)
           this.limpiarPantalla();
           this.productsPedido = [];
           this.nombreCliente = '';
           this.total = 0;
           this.objetoelem = [];
           sessionStorage.removeItem('cliente');
           
        }
        
        
      })
     
  
    }
   
    
  }
  enviarDbDemo(){
    if(this.nombreCliente === ''){
      Swal.fire(
        'Bad job!',
        'agrega un nombre!',
        'warning'
      )
      
    }else{
    let orderProduct: any[] =[];
   
    this.productsService.showProductsItem().subscribe({
      next: (data: any) => {
        data.pedido.forEach((product: any) => {
           
           let productos ={
            product: product.name,
            qty : product.cant
          }
          //orderEl.orders.push(productos)
          orderProduct.push(productos)
        })
       
        const dataOrder = this.orderService.crearOrder(orderProduct, this.nombreCliente)
        //console.log(dataOrder)
        let orderEl : any = {
          orders: [
            dataOrder
          ]
        }
        //console.log(orderEl)
        this.orderService.getOrderDemo().subscribe({
          next: (data: any) => {
           
            
            if(data.orders === undefined){
              this.crearOrderDemo(orderEl)
              this.limpiarPantalla();
              this.productsPedido = [];
              this.nombreCliente = '';
              this.total = 0;
              this.objetoelem = [];
              sessionStorage.removeItem('cliente');
            }else{
              //.log(dataOrder)
              const ordenMul =this.crearOrdenMul(data.orders, dataOrder)
              console.log(ordenMul)
              this.crearOrderDemo(ordenMul)
              this.limpiarPantalla();
              this.productsPedido = [];
              this.nombreCliente = '';
              this.total = 0;
              this.objetoelem = [];
              sessionStorage.removeItem('cliente');
            }

            
          }
        })
        
      }
    })
  }
  }
  crearOrdenMul(item: any, item1: any){
    let orderEl : any = {
      orders: [
        item1
      ]
    }
    item.forEach((item2: any) => {
       orderEl.orders.push(item2)
    })
    return orderEl
  }
  crearOrden(item: any) {
     this.orderService.getOrderItem(item).subscribe({
      next: (data: any) => {
      
        Swal.fire(
          'Pedido enviado con éxito!',
          'Podrás ver el estado de tu orden en pedidos',
          'success'
        )
        
      },
      error: (error) => {
        Swal.fire(
          'error!',
          'No se ha podido enviar tu orden',
          'error'
        )
       
      }
    })
    
  }

  crearOrderDemo(item: any){
    this.orderService.setOrderDemo(item).subscribe({
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
    this.productsService.showProductsItem().subscribe({
      next: (data: any) => {
        data.pedido.forEach((item: any) => {
          this.objetoelem.push(item.id);
        })  
      }
    })
    // this.productsService.showProducts2().subscribe({
    //   next: (data: any) => {
    //     data.forEach((datos: any) => {
    //       datos.pedido.forEach((el: any) => {
    //         this.objetoelem.push(el.id);
    //       });
    //     });
    //   },
    // });
  }
  agregarElemento(id: number) {
    this.productsService.showProductsItem().subscribe({
     
      next: (data: any) => {
       
      
        if(data.pedido === undefined){
         
          
          //const item = this.filter(data.pedido, id)
         this.productsService.getProductClickDemo(id);
          //this.mostrarProduct();
        }
        else{
          console.log('en el else')
          //console.log(data.pedido.id);
          data.pedido.forEach((item: any) => {
           
            if (this.objetoelem.includes(id)) {
              Swal.fire(
                'Error!',
                'El producto ya existe',
                'error'
              )
              
            }else{
              this.productsService.getProductClickDemo2(id, data.pedido)
              this.mostrarProduct();
            }
            
          });
          this.mostrarProduct();
        }
        this.mostrarProduct();
      }
    })


    //toDo codigo para API
    // let array3: any[] = [];
    // this.productsService.showProducts2().subscribe({
    //   next: (data: any) => {
    //     if (data.length == 0) {
    //       this.productsService.getProductClick(id);
    //       this.mostrarProduct();
    //     } else {
    //       data.forEach((datos: any) => {
    //         if (this.objetoelem.includes(id)) {
    //           console.log(this.objetoelem.includes(id));
    //           this.mostrarProduct();
    //           console.log('el producto ya existe');
    //         } else {
    //           console.log('en el else');
    //           console.log(this.objetoelem.includes(id));
    //           this.productsService.getProductClick2(id, datos.pedido);
    //           datos.pedido.forEach((data: any) => {
    //             this.productsService.getProductClick2(id, data);
    //             this.mostrarProduct();
    //           });
    //           this.mostrarProduct();
    //         }
    //         this.mostrarProduct();
    //       });
    //       this.mostrarProduct();
    //     }
    //     this.mostrarProduct();
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    // });
  }

  //todo codigo para API
  eliminarElementos(id: number) {
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
        this.productsService.showProducts2().subscribe({
          next: (data: any) => {
            data.forEach((datos: any) => {
              const filter = this.filter2(datos.pedido, id);
              const pedido = this.productsService.eliminarItem(filter);
              this.productsService.getProductItem2(pedido).subscribe({
                next: () => {
                  Swal.fire(
                    'Eliminado!',
                    `El producto ha sido eliminado. ${id}`,
                    'success',  
                  );
                  this.mostrarProduct();
                  this.objetoelem = [];
                  //this.arrayItem();
                },
               
              });
            });
          },
        });
       
      }
    });
  }
  eliminarElDemo(id: number){
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
        this.productsService.showProductsItem().subscribe({
          next: (data: any) => {
            const filter = this.filter2(data.pedido, id);
            const pedido = this.productsService.eliminarItem(filter);
            console.log(pedido);
           this.productsService.getProductItemDemo(pedido).subscribe({
            next: (data: any) => {
              Swal.fire(
                'Deleted!',
                `Producto eliminado`,
                'success'
              );
              this.mostrarProduct();
              this.objetoelem = [];

            }
           })
          }
        })
      }
    })
  }
   agregarUsuario() {
    Swal.fire({
        title: "Nombre Cliente",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#6096B4',
        cancelButtonColor: '#F55050'
        
    })
    .then(resultado => {
        if (resultado.value) {
            
            let nombre = resultado.value;
            sessionStorage.setItem('cliente', nombre );
            Swal.fire('Nombre agregado exitosamente ' + nombre);
            this.productsService.getCliente();
            this.nombreCliente = this.productsService.getCliente();
        }
    });
    
  }
  limpiarPantalla(){
   
      this.productsService.productsArray = []
      let item = {}
      this.productsService.getProductItemDemo(item).subscribe({
          next : () => {
            this.productsPedido = [];
            this.nombreCliente = '';
            this.total = 0;
            sessionStorage.removeItem('cliente');
          }
        })
        this.productsPedido = [];
        this.nombreCliente = '';
        this.total = 0;
        sessionStorage.removeItem('cliente');
        //todo modelo para API
      // this.productsService.deleteAll().subscribe({
      //   next : () => {
      //     this.productsPedido = [];
      //     this.nombreCliente = '';
      //     this.total = 0;
      //     sessionStorage.removeItem('cliente');
      //   }
      // })
     
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
