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
 productsPedido: any = this.productsService.productsArray;
 localArray : object[]=[];
 objetoelem : any = {};
 arrayRestantes : object[]=[];
  ngOnInit(){
   
    //this.productsPedido= this.productsService.getArrayProducts();
    this.dataProducts()
    //this.productsService.addProduct();
  }
  addItem(newItem: number){
    //this.productsService.getProductClick(newItem)
    // if(this.isAdd){
    //   alert('producto agregado')
    // }else{
    //   
    // }
   // console.log(this.productsService.addItemNew(newItem))
    // if(this.productsService.productsArray.length == 0){
    //   this.productsService.getProductClick(newItem)
    // }
  
    //this.productsService.getProductClick(newItem)
    //this.productsService.addProduct()
    // .subscribe((data: any) =>{
    //   console.log(data);
    // });
    //console.log(this.productsService.array())
    //console.log(this.productsService.arrayNumber)
    this.agregarElemento(newItem)
    //this.productsService.crearObjetoNuevo(newItem)
    //console.log(this.productsService.isMessage)
   //this.productsService.getProductClick(newItem)
   //console.log(this.productsService.showProducts2())
  //  this.productsService.showProducts2().subscribe({
  //   next: (data: any) => {
  //     data.forEach((datos: any)=>{
  //       console.log(datos.pedido)
  //       console.log(this.filter(datos.pedido, newItem))
  //       //datos.pedido.push(this.arraysRestantes())
  //     })
      //console.log(data)
    //}
   //})
    this.dataProducts()
    //console.log(this.productsService.isitemadd());
   //console.log(this.productsService.productsArray.length)
  //  for(let x in this.productsService.productsArray) {
  //   //console.log(this.productsService.productsArray[x])
  //   this.addElement(this.productsService.productsArray[x], newItem)
  // }
   //console.log(this.productsService.getProductItem())
    //console.log(newItem)
  }
  addElement(item: any, id: number){
    if(item.id == id){
      //alert('producto agregado')
    }else{
     // this.productsService.getProductClick(id)
    }
   
  }
  dataProducts(){
   this.arrayRestantes = []
   let isLoggedIn = this.productsService.isMeseroRole();
   this.localArray = this.productsService.getProductItem();
  
  //if(this.productsService.getrole() != ''){
    if(isLoggedIn){
    if(this.localArray.length > this.productsService.productsArray.length){
     
      this.localArray.forEach(Element =>{
      
        this.productsService.productsArray.push(Element)
      })
     
    }
  }else{
    this.productsPedido = []
    this.localArray = [];
    localStorage.clear();
  }
   
    
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
  agregarElemento(id: number){
    this.productsService.showProducts2().subscribe({
      next: (data: any) =>{
        
        data.forEach((datos: any)=>{
         
          if(datos.pedido.length == 0){
            this.productsService.getProductClick(id);
            
          }else{
            datos.pedido.forEach((el: any)=>{
            
              let array = []
              array.push(el.id)
              if(array.includes(id)){
                alert('el producto ya existe')
              }
              else{
                datos.pedido.forEach((data: any)=>{
                  this.productsService.getProductClick2(id,data);
                })
                
              }
              
            })
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
