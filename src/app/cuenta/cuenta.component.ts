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
   this.productsService.getProductClick(newItem)
    this.dataProducts()
    console.log(this.productsService.isitemadd());
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
      this.productsService.getProductClick(id)
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
  valor1(id:string){
    //this.arrayRestantes = []
   
    this.id = id
    //console.log(id)
    for(let x in this.productsService.productsArray) {
      //console.log(this.productsService.productsArray[x])
      this.elementosEditados(this.productsService.productsArray[x])
    }
   
    return this.valor
  }
  valor2(id:string){
    //this.arrayRestantes = []
   
    this.id = id
    //console.log(id)
    for(let x in this.productsService.productsArray) {
      //console.log(this.productsService.productsArray[x])
      this.elementosEditados2(this.productsService.productsArray[x])
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
    item.cant +=1;
    console.log('cambio')
    console.log(item.id);
    
    console.log(this.id)
    console.log(this.valor)
   }
   else{
    this.arraysRestantes(item);
    
   }
  }
  elementosEditados2(item: any) {
    
    if(item.id == this.id) {
      if(item.cant > 1){
        item.cant -= 1;
      }
      else{
        item.cant=1;
      }
     console.log('cambio')
     console.log(item.id);
     
     console.log(this.id)
     console.log(this.valor)
    }
    else{
     this.arraysRestantes(item);
     
    }
   }
  eliminarElementos(item: any){
    let indexArray;

  }
  arraysRestantes(item: any){
    let elemento = [];
     elemento.push(item)
     this.arrayRestantes = elemento
     console.log(this.arrayRestantes)
  }

  increase(item:number){
    
  }
}


