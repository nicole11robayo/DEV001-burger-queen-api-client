import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductsService } from '../products.service/products.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css'],
})
export class CuentaComponent implements OnInit {
  valor: string = '';
  id: string = '';

  constructor(private productsService: ProductsService) {}

 
  productsPedido: any = [];

  localArray: object[] = [];
  objetoelem: any = [];
  arrayRestantes: object[] = [];
  total: number = 0;
  ngOnInit() {
    this.productsService.getCliente()
    this.arrayItem();
    this.mostrarProduct();
    const date = moment();

    const ahora = date.format('YYYY-MM-DD hh:mm:ss');
    console.log(ahora);
    let hi = '2023-02-20 08:26:42';
    let hf = '2023-02-20 09:32:41';
    const momentHi = moment(hi);
    const momentHf = moment(hf);
    let diferenciaEnMinutos = momentHf.diff(momentHi, 'minutes');

    console.log(diferenciaEnMinutos);

   
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
  
  async agregarUsuario() {
    const { value:  nombre } =  await Swal.fire({
      title: 'Nombre del cliente',
      input: 'text',
      inputLabel: 'Escribe su nombre',
      inputValue: '',
      //showCancelButton: true,
     
    })
    if (nombre == '') {
      Swal.fire('agrega un nombre')
    }else{
      sessionStorage.setItem('cliente', nombre );
      Swal.fire(`Entered email: ${nombre}`)
      console.log(this.productsService.getCliente())
    }
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
