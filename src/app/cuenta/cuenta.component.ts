import { Component, OnInit} from '@angular/core';
import { ProductsService } from '../products.service/products.service'

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  constructor(private productsService: ProductsService) { }

  ngOnInit(){
    //this.dataProducts()
  }
  dataProducts(){
    if(this.productsService.getProductItem() != null){
      //console.log(this.productsService.getProductItem())
    }
    console.log('holaa');
  }

}
