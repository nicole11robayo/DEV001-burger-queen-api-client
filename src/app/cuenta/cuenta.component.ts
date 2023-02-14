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


  productsPedido: any = this.productsService.productsArray;

  ngOnInit(){
    //this.productsPedido= this.productsService.getArrayProducts();
    //this.dataProducts()
  }
  addItem(newItem: number){
    this.productsService.getProductClick(newItem)
    console.log(newItem)
  }

  dataProducts(){

    if(this.productsService.getProductItem() != null){
      //console.log(this.productsService.getProductItem())
    }
    console.log('holaa');
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
