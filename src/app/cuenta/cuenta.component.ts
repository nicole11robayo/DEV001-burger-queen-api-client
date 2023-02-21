import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ProductsService } from '../products.service/products.service'
import * as moment from 'moment';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  valor:string = '';
  id:string = '';
  
  constructor(private productsService: ProductsService) { 
    
  }
  
 //productsPedido: object[]=[];
 productsPedido: any = [];
// productsPedido: any = this.productsService.productsArray;
 localArray : object[]=[];
 objetoelem : any = [];
 arrayRestantes : object[]=[];
 total: number=0;
  ngOnInit(){
    //this.productsPedido= this.productsService.getArrayProducts();
    
    this.arrayItem()
    this.mostrarProduct()
    const date = moment();

    const ahora = date.format('YYYY-MM-DD hh:mm:ss');
    console.log(ahora)
    let hi = '2023-02-20 08:26:42';
    let hf = '2023-02-20 09:32:41';
    const momentHi = moment(hi)
    const momentHf = moment(hf)
    let diferenciaEnMinutos = momentHf.diff(momentHi, "minutes")
   
    console.log(diferenciaEnMinutos) 
    
   
    //this.productsService.addProduct();
  }
  mostrarProduct(){
    this.productsService.showProducts2().subscribe({
      next: (data: any) =>{
       
        data.forEach((product: any)=>{
          this.productsPedido = product.pedido
          this.total = this.productsPedido.reduce((
            acc:any,
            obj:any,
          ) => acc + (obj.price * obj.cant),
          0);
          console.log("Total: ", this.total)
       
        })
      }})
  }
  addItem(newItem: number){
 
    this.arrayItem()
    this.agregarElemento(newItem)
    this.mostrarProduct()
    
   
  }

 
  valor1(numero: string, id:number){
   // console.log(numero, id)
    this.productsService.showProducts2().subscribe({
      next: (data: any) =>{
        data.forEach((datos: any)=>{
           if(datos.pedido.id == id){
            console.log(datos.pedido)
           }
          //console.log(datos.pedido)
           let edit: never[] = []
          this.filter(datos.pedido, id).forEach((datos2: any)=>{
            return edit = datos2
           
          })
          //agregarItem
         
         this.elementosEditados(edit, numero)
         let itemEl = this.productsService.agregarItem(this.elementosEditados(edit, numero), this.filter2(datos.pedido, id))
         this.productsService.getProductItem2(itemEl).subscribe(data => {
          console.log('cambios agregados')
          this.mostrarProduct()
         })
        // console.log(this.filter2(datos.pedido, id))
        })
      }
    })
    this.mostrarProduct()
   
  }

  totalPrice( precio:number){
    let cantidadNumber = parseInt(this.valor)
    //let cantidadNumber = parseInt(cantidad);
    //return this.valor1()*precio
    return cantidadNumber*precio;
  }

  elementosEditados(item: any, numero: string) {
   
    let objetoNuevo ={
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      type: item.type,
      dateEntry: item.dateEntry,
      cant: numero,
    }

    return objetoNuevo
  }
  enviarDB(){

    // const dataArr = new Set(this.productsService.arrayNumber);
    // let result: Array<any> = [...dataArr];
    // result.forEach((item: number) => this.productsService.deleteAll(item).subscribe({
    //   next : () => alert('productos enviados')
    // }));
  }
  arrayItem(){
    this.productsService.showProducts2().subscribe({
      next: (data: any) =>{
        data.forEach((datos: any)=>{
          datos.pedido.forEach((el: any)=>{
            this.objetoelem.push(el.id)

          })
        })
      }
    })
  }
  agregarElemento(id: number){
    let array3: any[] = [];
    this.productsService.showProducts2().subscribe({
      next: (data: any) =>{
       
        if(data.length == 0){
         
          this.productsService.getProductClick(id);
          this.mostrarProduct();
        }
        else{
         
          data.forEach((datos: any)=>{
               
               if(this.objetoelem.includes(id)){
                 console.log(this.objetoelem.includes(id))
                 this.mostrarProduct()
                 console.log('el producto ya existe');
               }else{
                  
                   console.log('en el else');
                   console.log(this.objetoelem.includes(id))
                   this.productsService.getProductClick2(id,datos.pedido);
                   datos.pedido.forEach((data: any)=>{
                     this.productsService.getProductClick2(id,data);
                     this.mostrarProduct();
                   })
                   this.mostrarProduct();
                 
               }
               this.mostrarProduct()
             
          })
          this.mostrarProduct()
        }
        this.mostrarProduct();
      },
      error: (error) => {
        console.log(error)
      } 
      
    })
  }
  eliminarElementos(item: any){
    let indexArray;

  }
  
  filter(item : any, id : number){
    let filterId = item.filter((product: any) => product.id == id);
    return filterId
  }
  filter2(item : any, id : number){
    let filterId = item.filter((product: any) => product.id != id);
    return filterId
  }
}
