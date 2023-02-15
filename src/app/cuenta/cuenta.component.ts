import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ProductsService } from '../products.service/products.service'

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  valor:number=1;
  constructor(private productsService: ProductsService) { }
  
 //productsPedido: object[]=[];
 productsPedido: any = this.productsService.productsArray;
 localArray : object[]=[];
  ngOnInit(){
   
    //this.productsPedido= this.productsService.getArrayProducts();
    this.dataProducts()
    console.log('local array')
    console.log(this.localArray)
    console.log('product pedido')
    console.log(this.productsPedido)
  }
  addItem(newItem: number){
    //this.productsService.getProductClick(newItem)
   this.productsService.getProductClick(newItem)
   
   this.dataProducts()
   console.log('local array')
   console.log(this.localArray)
   console.log('product pedido')
   console.log(this.productsPedido)
   //console.log(this.productsService.getProductItem())
    //console.log(newItem)
  }

  dataProducts(){
   let isLoggedIn = this.productsService.isMeseroRole();
   this.localArray = this.productsService.getProductItem();
   console.log(this.productsService.getrole() != '')
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
  valor1(){
    return this.valor
  }

  totalPrice( precio:number){
    //let cantidadNumber = parseInt(cantidad);
    return this.valor1()*precio
    //return cantidadNumber*precio;
  }

  

}
