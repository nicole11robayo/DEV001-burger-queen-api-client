import { Component, OnInit} from '@angular/core';
import { ProductsService } from '../products.service/products.service'

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  constructor(private productsService: ProductsService) { }
  productsPedido: any = [];
  counter:number = 1;
  cantidadProduct = this.productsService.cantidad;

  ngOnInit(){
    //this.showProductsOrder();
    //console.log(this.productsService.getProductItem());
    this.productsPedido= this.productsService.getArrayProducts();
    console.log(this.cantidadProduct)

  }

  
  showProductsOrder(){
    //this.productsPedido= this.productsService.productsArray;
    if(this.productsService.getProductItem() != null){
      this.productsPedido= JSON.parse(this.productsService.getProductItem()!);
    }
    //this.productsPedido= this.productsService.getProductItem();
  }
  /*
  dataProducts(){
    if(this.productsService.getProductItem() != null){
      //console.log(this.productsService.getProductItem())
    }
    console.log('holaa');
  }
*/

}
