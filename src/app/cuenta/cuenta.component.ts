import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ProductsService } from '../products.service/products.service'

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  valor:string = '';
  id:string = '';
  
  constructor(private productsService: ProductsService) { }
  
 //productsPedido: object[]=[];
 productsPedido: any = [];
// productsPedido: any = this.productsService.productsArray;
 localArray : object[]=[];
 objetoelem : any = [];
 arrayRestantes : object[]=[];
  ngOnInit(){
   
    //this.productsPedido= this.productsService.getArrayProducts();
    
    this.arrayItem()
    this.mostrarProduct()
   
    //this.productsService.addProduct();
  }
  mostrarProduct(){
    this.productsService.showProducts2().subscribe({
      next: (data: any) =>{
       
        data.forEach((product: any)=>{
          this.productsPedido = product.pedido
          console.log(product.pedido);
        })
      }})
  }
  addItem(newItem: number){
 
    this.arrayItem()
    this.agregarElemento(newItem)
    this.mostrarProduct()
   
   
  }

 
  valor1(numero: string, id:string){
    //this.arrayRestantes = []
   
    this.valor = numero
    this.id = id
    //console.log(id)
    for(let x in this.productsService.productsArray) {
      //console.log(this.productsService.productsArray[x])
      this.elementosEditados(this.productsService.productsArray[x])
    }
   
    return this.valor
  }

  totalPrice( precio:number){
    let cantidadNumber = parseInt(this.valor)
    //let cantidadNumber = parseInt(cantidad);
    //return this.valor1()*precio
    return cantidadNumber*precio;
  }

  elementosEditados(item: any) {
    
   if(item.id == this.id) {
    console.log('cambio')
    console.log(item.id);
    
    console.log(this.id)
    console.log(this.valor)
   }
   else{
  
    
   }
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
        
        data.forEach((datos: any)=>{
         
          if(datos.pedido.length == 0){
            this.productsService.getProductClick(id);
            
          }else{
            if(this.objetoelem.includes(id)){
              console.log(this.objetoelem.includes(id))
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
 
          }
           datos.pedido
        })
      },
      error: (error) => {
        console.log(error)
      } 
      
    })
  }
  eliminarElementos(item: any){
    let indexArray;

  }
  
  filter(item : [], id : number){
    let filterId = item.filter((product: any) => product.id == id);
    return filterId
  }
}
